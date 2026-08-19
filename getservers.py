"""
Red Eclipse server list fetcher and notifier.
- Queries the master server, polls each game server via UDP, and writes JSON outputs.
- Optionally posts Discord webhook notifications when new players join.
"""

import socket
import shlex
import struct
import time
import json
import re
import urllib.request
import argparse
import os
from collections import namedtuple
from datetime import datetime, timezone
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env (local use only)
load_dotenv()

# ==========================================
#                 CONFIGURATION
# ==========================================

MASTER_HOST = "play.redeclipse.net"
MASTER_PORT = 28800

# Timeouts
TIMEOUT_TCP = 5.0
TIMEOUT_UDP = 2.0

# Discord bot settings
DISCORD_BOT = 1
DISCORD_BOT_NAME = "Server browser"
DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL") # Discord webhook URL needs to be added as repository secret in GitHub (Load environment variables from .env for local use only)
DISCORD_SERVER_LINK = "https://redeclipse.net/servers/"
DISCORD_PING_ROLE = ""

# Delays
NETWORK_THROTTLE = 0.05

# Output paths
DATA_DIR = Path('data')
OUTPUT_FILE = DATA_DIR / 'servers.json'
TIME_FILE = DATA_DIR / 'time.json'
MAPS_DIR = Path('maps')
MAPS_FILE = DATA_DIR / 'maps.json'
NOTIFY_FILE = 'notify.json'
IP_CACHE_FILE = DATA_DIR / 'ip.json'

# Game state mapping
STATE_IDLE = 0
STATE_INITIALISING = 3
STATE_PLAY = 5
STATE_VOTE = 8

STATE_FALLBACK = STATE_PLAY

STATE_MAP = {
    STATE_IDLE: "idle",
    STATE_INITIALISING: "initialising",
    STATE_PLAY: "play",
    STATE_VOTE: "vote"
}

# Platform mapping
PLATFORM_WIN = 0
PLATFORM_MAC = 1
PLATFORM_UNIX = 2

PLATFORM_FALLBACK = PLATFORM_UNIX

PLATFORM_MAP = {
    PLATFORM_WIN: "win",
    PLATFORM_MAC: "mac",
    PLATFORM_UNIX: "unix"
}

# Global cache for IP lookups
IP_CACHE = {}
# Global args for debug printing
ARGS = None

# ==========================================
#                  CONSTANTS
# ==========================================

MUTATORS = {
    'ffa': 1 << 0, 'coop': 1 << 1, 'instagib': 1 << 2, 'medieval': 1 << 3,
    'kaboom': 1 << 4, 'duel': 1 << 5, 'survivor': 1 << 6, 'classic': 1 << 7,
    'onslaught': 1 << 8, 'vampire': 1 << 9, 'resize': 1 << 10, 'hard': 1 << 11,
    'arena': 1 << 12, 'dark': 1 << 13, 'gsp1': 1 << 14, 'gsp2': 1 << 15, 'gsp3': 1 << 16
}

MODE_SPECIFIC_MUTATORS = {
    'deathmatch': ['gladiator', 'oldschool'],
    'capture-the-flag': ['quick', 'defend', 'protect'],
    'defend-and-control': ['quick', 'king'],
    'bomber-ball': ['hold', 'basket', 'assault'],
    'race': ['lapped', 'endurance', 'gauntlet'],
    'speedrun': ['lapped', 'endurance', 'gauntlet'],
}

GAME_MODES = ['demo', 'editing', 'deathmatch', 'capture-the-flag', 'defend-and-control', 'bomber-ball', 'speedrun']
MASTER_MODES = ['open', 'veto', 'locked', 'private', 'password']
PRIVILEGE_NAMES = ['administrator', 'developer', 'founder', 'localadministrator', 'localmoderator',
                   'localoperator', 'localsupporter', 'moderator', 'none', 'operator', 'player', 'supporter']

# Icon mapping for Discord footer (game modes)
MODE_ICON_MAP = {
    'capture-the-flag': 'capture.png',
    'capture': 'capture.png',
    'defend-and-control': 'defend.png',
    'defend': 'defend.png',
    'bomber-ball': 'bomber.png',
    'bomber': 'bomber.png',
    'editing': 'editing.png',
    'demo': 'demo.png',
    'deathmatch': 'deathmatch.png',
    'race': 'speedrun.png',
    'speedrun': 'speedrun.png'
}

# Icon mapping for Discord author (master modes)
MASTERMODE_ICONS = {
    'full': 'disconnect.png',
    'open': 'connect.png',
    'veto': 'failed.png',
    'failed': 'failed.png',
    'locked': 'locked.png',
    'private': 'locked.png',
    'password': 'locked.png',
    'unknown': 'unknown.png'
}

# Cube 2 Protocol Unicode mapping
CUBE2_UNICHARS = [
    0, 192, 193, 194, 195, 196, 197, 198, 199, 9, 10, 11, 12, 13, 200, 201, 202, 203, 204, 205, 206, 207, 209, 210,
    211, 212, 213, 214, 216, 217, 218, 219, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77,
    78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104,
    105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126,
    220, 221, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 241, 242, 243,
    244, 245, 246, 248, 249, 250, 251, 252, 253, 255, 0x104, 0x105, 0x106, 0x107, 0x10C, 0x10D, 0x10E, 0x10F, 0x118,
    0x119, 0x11A, 0x11B, 0x11E, 0x11F, 0x130, 0x131, 0x141, 0x142, 0x143, 0x144, 0x147, 0x148, 0x150, 0x151, 0x152,
    0x153, 0x158, 0x159, 0x15A, 0x15B, 0x15E, 0x15F, 0x160, 0x161, 0x164, 0x165, 0x16E, 0x16F, 0x170, 0x171, 0x178,
    0x179, 0x17A, 0x17B, 0x17C, 0x17D, 0x17E, 0x404, 0x411, 0x413, 0x414, 0x416, 0x417, 0x418, 0x419, 0x41B, 0x41F,
    0x423, 0x424, 0x426, 0x427, 0x428, 0x429, 0x42A, 0x42B, 0x42C, 0x42D, 0x42E, 0x42F, 0x431, 0x432, 0x433, 0x434,
    0x436, 0x437, 0x438, 0x439, 0x43A, 0x43B, 0x43C, 0x43D, 0x43F, 0x442, 0x444, 0x446, 0x447, 0x448, 0x449, 0x44A,
    0x44B, 0x44C, 0x44D, 0x44E, 0x44F, 0x454, 0x490, 0x491
]

# ==========================================
#                DATA STRUCTURES
# ==========================================

Server = namedtuple('Server', ['ip', 'port', 'name', 'branch'])
Player = namedtuple('Player', ['inputpos', 'name', 'raw_name', 'privilege'])
Status = namedtuple('Status', ['clients', 'max_clients', 'map_name', 'game_mode', 'master_mode',
                             'time_remaining', 'time_left', 'mutators', 'vars', 'mods', 'version', 'branch', 'major_version',
                             'minor_version', 'patch_version', 'platform', 'arch', 'state', 'players', 'raw_response'])

COLOR_PATTERN = re.compile(r'\f[a-zA-Z0-9\[\]]')
PRIV_PATTERN = re.compile(r'\$priv([a-z]+)tex')

# ==========================================
#                HELPER FUNCTIONS
# ==========================================

def run_discord_debug_check(player_name, server_data):
    if not DISCORD_WEBHOOK_URL:
        return "[DEBUG-Discord-weebhook] FAILED: Webhook URL is not configured in .env"

    # Clamp player name to max 20 chars and adjust server name length to keep title width stable
    player_display_name = str(player_name) if player_name is not None else ""
    if len(player_display_name) > 20:
        player_display_name = player_display_name[:20]
    server_max_len = 23 + (20 - len(player_display_name))
    server_name = truncate_display_name(server_data.get('name', 'Unknown'), server_max_len)
    content = f"(Debug Connection Check)"
    
    payload = {"content": content, "username": DISCORD_BOT_NAME}

    try:
        req = urllib.request.Request(
            DISCORD_WEBHOOK_URL,
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json', 'User-Agent': 'RedEclipseBot/1.0'}
        )
        with urllib.request.urlopen(req, timeout=5.0) as response:
            return f"[DEBUG-Discord-weebhook] Success! Server responded with: {response.status}"
    except Exception as e:
        return f"[DEBUG-Discord-weebhook] FAILED: {e}"

def send_discord_webhook(trigger_player_name, server_data):
    if not DISCORD_WEBHOOK_URL:
        if ARGS and ARGS.debug: print("[DEBUG-Discord-weebhook] Webhook URL missing.")
        return

    # Clamp player name to max 20 chars and adjust server name length accordingly
    player_display_name = str(trigger_player_name) if trigger_player_name is not None else ""
    if len(player_display_name) > 20:
        player_display_name = player_display_name[:20]
    server_max_len = 23 + (20 - len(player_display_name))
    server_name = truncate_display_name(server_data.get('name', 'Unknown'), server_max_len)

    location = server_data.get('location', 'Unknown')
    map_name = server_data.get('map', 'Unknown')
    game_mode = server_data.get('gamemode', 'UNKNOWN')

    # Format game mode for display using Liquid-like rules
    minor_words_set = {"a", "an", "the", "and", "but", "or", "for", "nor", "so", "yet", "as", "at", "by", "in", "of", "off", "on", "per", "to", "up", "with"}
    def _format_mode_titlecase(mode_str):
        try:
            words = mode_str.replace('-', ' ').strip().lower().split()
        except Exception:
            words = []
        final_words = []
        for idx, w in enumerate(words, start=1):
            current = w.strip()
            if not current:
                continue
            capitalize_word = True
            if idx > 1 and current in minor_words_set:
                capitalize_word = False
            final_words.append(current.capitalize() if capitalize_word else current)
        return " ".join(final_words) if final_words else "Unknown"
    game_mode_display = _format_mode_titlecase(game_mode)
    def _capitalize_first(s):
        return s[:1].upper() + s[1:] if isinstance(s, str) and s else ""
    map_name_display = _capitalize_first(map_name)

    # Stats
    active_p = server_data.get('players', 0)
    max_p = server_data.get('max_players', 0)
    master_mode_raw = server_data.get('mastermode', 'unknown').lower()
    master_mode_disp = _capitalize_first(master_mode_raw)
    version = server_data.get('version_full', 'N/A')

    # Determine Master Mode Icon (Author Icon)
    if max_p > 0 and active_p >= max_p:
        mm_icon_file = MASTERMODE_ICONS.get('full', 'disconnect.png')
    elif master_mode_raw == 'veto':
        mm_icon_file = MASTERMODE_ICONS.get('veto', 'failed.png')
    else:
        mm_icon_file = MASTERMODE_ICONS.get(master_mode_raw, 'unknown.png')
    mastermode_icon_url = f"https://raw.githubusercontent.com/redeclipse/textures/master/servers/{mm_icon_file}"

    # Determine Game Mode Icon (Footer Icon)
    mode_lower = game_mode.lower()
    if mode_lower in MODE_ICON_MAP:
        gamemode_icon_file = MODE_ICON_MAP[mode_lower]
        gamemode_icon_url = f"https://raw.githubusercontent.com/redeclipse/textures/master/modes/{gamemode_icon_file}"
    else:
        gamemode_icon_url = "https://raw.githubusercontent.com/redeclipse/textures/master/servers/unknown.png"

    # Player List
    all_players = server_data.get('player_list_data', [])
    player_names = [p.get('name', 'Unknown') for p in all_players]
    player_names_str = ", ".join(player_names)
    if not player_names_str:
        player_names_str = "None"

    # Dynamic Timestamp
    current_utc_iso = datetime.now(timezone.utc).strftime('%H:%M')

    # Image Logic
    image_url = "https://raw.githubusercontent.com/redeclipse/www-bits/master/bg1.jpg"
    try:
        if MAPS_DIR.exists() and map_name and map_name not in ("Offline/Unknown", "Unknown"):
            map_file = MAPS_DIR / f"{map_name.lower()}.png"
            if map_file.exists():
                image_url = f"https://raw.githubusercontent.com/redeclipse/maps/refs/heads/master/{map_name.lower()}.png"
    except Exception:
        pass
   
    # Build Payload
    payload = {
        "username": DISCORD_BOT_NAME,
        "avatar_url": "https://raw.githubusercontent.com/redeclipse/promotional/master/assets/emblem.png",
        "content": DISCORD_PING_ROLE if DISCORD_PING_ROLE else "",
        "embeds": [
            {
                "title": f"{player_display_name} joined {server_name}",
                "url": DISCORD_SERVER_LINK,
                "color": 9109504,
                "description": f"> **Players** {player_names_str}",
                "thumbnail": {
                    "url": image_url
                },
                "author": {
                    "name": f"{game_mode_display} on {map_name_display}",
                    "url": DISCORD_SERVER_LINK,
                    "icon_url": gamemode_icon_url
                },
                "footer": {
                    "text": f"{master_mode_disp}  •  {active_p}/{max_p}  •  {version}  •  {location}  •  {current_utc_iso} UTC",
                    "icon_url": mastermode_icon_url
                }
            }
        ]
    }

    try:
        req = urllib.request.Request(
            DISCORD_WEBHOOK_URL,
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json', 'User-Agent': 'RedEclipseBot/1.0'}
        )
        with urllib.request.urlopen(req, timeout=5.0) as r:
            if ARGS and ARGS.debug:
                print(f"[DEBUG-Discord-weebhook] Embed notification sent for {trigger_player_name}")
    except Exception as e:
        if ARGS and ARGS.debug:
            print(f"[DEBUG-Discord-weebhook] Failed to send webhook embed: {e}")

def hexdump(data):
    lines = []
    for i in range(0, len(data), 16):
        chunk = data[i:i+16]
        hex_p = " ".join(f"{b:02x}" for b in chunk)
        ascii_p = "".join(chr(b) if 32 <= b <= 126 else "." for b in chunk)
        lines.append(f"{i:04x}  {hex_p:<48}  |{ascii_p}|")
    return "\n".join(lines)

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hsl(r, g, b):
    r, g, b = r/255.0, g/255.0, b/255.0
    mx, mn = max(r, g, b), min(r, g, b)
    df = mx - mn
    h = s = 0.0
    l = (mx + mn) / 2.0
    if df != 0:
        s = df / (2.0 * l if l <= 0.5 else 2.0 - 2.0 * l)
        if mx == r: h = (g - b) / df + (6.0 if g < b else 0.0)
        elif mx == g: h = (b - r) / df + 2.0
        else: h = (r - g) / df + 4.0
        h /= 6.0
    return h, s, l

def generate_css_filter(hex_color):
    # Lookup table for exact Red Eclipse team colors
    # These filters assume the source icon is black
    PRESETS = {
        '#808080': "invert(58%) sepia(6%) saturate(14%) hue-rotate(320deg) brightness(89%) contrast(85%)",  # Neutral Grey
        '#f03030': "invert(24%) sepia(64%) saturate(3509%) hue-rotate(346deg) brightness(94%) contrast(105%)", # Omega Red
        '#3030f0': "invert(13%) sepia(91%) saturate(5887%) hue-rotate(244deg) brightness(88%) contrast(106%)", # Alpha Blue
        '#000000': "none",
        '#ffffff': "invert(100%)"
    }
    lower_hex = hex_color.lower()
    if lower_hex in PRESETS:
        return PRESETS[lower_hex]

    # Fallback for unknown custom colors (Approximation)
    try:
        r, g, b = hex_to_rgb(hex_color)
        h, s, l = rgb_to_hsl(r, g, b)
        if s < 0.05: # Grayscale fallback
             return f"invert(0%) sepia(0%) saturate(0%) brightness({int(l*100)}%) contrast(100%) invert(100%)"
        
        # Generic heuristic (Rough approximation)
        hu = (h * 360)
        return f"invert(50%) sepia(100%) saturate(1000%) hue-rotate({hu:.0f}deg) brightness({int(l*100)}%)"
    except Exception:
        return "none"

def uncolor_string(s):
    return COLOR_PATTERN.sub('', s) if s else ""

def truncate_display_name(name, max_len=23):
    try:
        s = str(name) if name is not None else ""
        if len(s) > max_len:
            return s[:max_len-3] + "..."
        return s
    except Exception:
        return "Unknown"

def strip_player_data(name):
    if "$priv" in name: name = re.sub(r'\(.*\$priv.*\)', '', name)
    lb = name.rfind(']')
    if lb != -1: name = name[lb+1:]
    return uncolor_string(name).strip()

def extract_colors(raw_name):
    matches = re.findall(r'\[(\d+)\]', raw_name)
    p_int = int(matches[0]) & 0xFFFFFF if len(matches) > 0 else 16777215
    t_int = int(matches[1]) & 0xFFFFFF if len(matches) > 1 else 16777215
    return p_int, f"#{p_int:06x}", t_int, f"#{t_int:06x}"

def get_mutator_names(flags, game_mode):
    # 1. Get standard mutators up to Arena (Bit 0 to 12)
    muts = [m for m, mask in MUTATORS.items() if mask <= (1 << 12) and flags & mask]
    
    specs = MODE_SPECIFIC_MUTATORS.get(game_mode, [])
    
    # 2. Check Bit 13: Always "dark"
    if flags & (1 << 13):
        muts.append('dark')
    
    # 3. Check Bits 14, 15, and 16: Mode-Specific Mutators
    # Bit 14 -> specs[0]
    if flags & (1 << 14):
        if len(specs) > 0 and specs[0]:
            muts.append(specs[0])
        else:
            muts.append('gsp1')
    # Bit 15 -> specs[1]
    if flags & (1 << 15):
        if len(specs) > 1 and specs[1]:
            muts.append(specs[1])
        else:
            muts.append('gsp2')
    # Bit 16 -> specs[2]
    if flags & (1 << 16):
        if len(specs) > 2 and specs[2]:
            muts.append(specs[2])
        else:
            muts.append('gsp3')
    return [m for m in muts if m]

def ip_to_country(ip):
    if ip in IP_CACHE:
        return IP_CACHE[ip]
    try:
        with urllib.request.urlopen(f"http://ip-api.com/json/{ip}?fields=country", timeout=3.0) as r:
            data = json.load(r)
            country = data.get('country', 'Unknown')
            if country != 'Unknown':
                IP_CACHE[ip] = country
                return country
    except Exception as e:
        if ARGS and ARGS.debug:
            print(f"[Warning] Geo-IP lookup failed for {ip}: {e}")
    return 'Unknown'

def map_state_to_label(state_code):
    try:
        return STATE_MAP.get(int(state_code), STATE_MAP.get(STATE_FALLBACK, "play"))
    except Exception:
        return STATE_MAP.get(STATE_FALLBACK, "play")

def map_platform_to_label(platform_code):
    try:
        return PLATFORM_MAP.get(int(platform_code), PLATFORM_MAP.get(PLATFORM_FALLBACK, "unix"))
    except Exception:
        return PLATFORM_MAP.get(PLATFORM_FALLBACK, "unix")

# ==========================================
#                PROTOCOL HANDLING
# ==========================================

class ProtocolStream:
    def __init__(self, data, debug=False):
        self.data = data
        self.offset = 0
        self.debug = debug
        
        if debug:
            print(f"\n[DEBUG-Poller] Parsing UDP Response ({len(data)} bytes)")
        
        self.read_int("UDP Header")
        self.offset = 5

    def read_int(self, label="int"):
        start = self.offset
        try:
            ch1 = struct.unpack('<b', self.data[self.offset:self.offset+1])[0]
            self.offset += 1
            if ch1 == -128:
                val = struct.unpack('<h', self.data[self.offset:self.offset+2])[0]
                self.offset += 2
                mode = "0x80 (16-bit)"
            elif ch1 == -127:
                val = struct.unpack('<i', self.data[self.offset:self.offset+4])[0]
                self.offset += 4
                mode = "0x81 (32-bit)"
            else:
                val, mode = ch1, "Single-Byte"
            
            if self.debug:
                raw = " ".join(f"{b:02x}" for b in self.data[start:self.offset])
                print(f"  {start:04x} | {raw:<11} | {label:<15}: {val} ({mode})")
            return val
        except Exception:
            return 0

    def read_string(self, label="string"):
        start = self.offset
        s = []
        while self.offset < len(self.data) and self.data[self.offset] != 0:
            b = self.data[self.offset]
            s.append(chr(CUBE2_UNICHARS[b]) if b < len(CUBE2_UNICHARS) else '?')
            self.offset += 1
        res = "".join(s)
        if self.debug:
            raw = " ".join(f"{b:02x}" for b in self.data[start:min(self.offset, start+5)])
            print(f"  {start:04x} | {raw:<11}...| {label:<15}: \"{res}\"")
        self.offset += 1
        return res

def fetch_server_status(ip, port, debug=False):
    udp_port = port + 1
    query = b'\x81\xec\x04\x01\x00'
    
    try:
        # Throttle prevents socket buffer flooding
        time.sleep(NETWORK_THROTTLE)
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
            sock.settimeout(TIMEOUT_UDP)
            sock.sendto(query, (ip, udp_port))
            data, _ = sock.recvfrom(4096)
            stream = ProtocolStream(data, debug)
            
            # --- Parse header ---
            clients = stream.read_int("Clients")
            if clients < 0 or clients > 255:
                if debug: print(f"[WARNING] Invalid client count {clients} from {ip}")
                return None
            int_count = stream.read_int("Int Count")
            version = stream.read_int("Protocol")
            g_mode_c = stream.read_int("Game Mode")
            muts = stream.read_int("Mutators")
            tr = stream.read_int("Time Remaining")
            mc = stream.read_int("Max Clients")
            mm_c = stream.read_int("Master Mode")
            vars = stream.read_int("Vars")
            mods = stream.read_int("Mods")
            
            # --- Parse extras ---
            int_count -= 8
            maj, minr, pat = 0, 0, 0
            platform = arch = state = time_left_var = 0
            if version >= 226:
                maj = stream.read_int("Maj")
                minr = stream.read_int("Min")
                pat = stream.read_int("Pat")
                int_count -= 3
                # Read additional vars in order
                platform = stream.read_int("Platform")
                arch = stream.read_int("Arch")
                state = stream.read_int("State")
                time_left_var = stream.read_int("Time Left")
                int_count -= 4
            # Consume any remaining extras if present
            for _ in range(max(0, int_count)):
                stream.read_int("Extra")
            
            # --- Parse strings ---
            m_name = stream.read_string("Map")
            _ = stream.read_string("Server Name")
            br = stream.read_string("Branch") if version >= 227 else ""
            
            # --- Parse players ---
            p_names = [stream.read_string(f"P{i}") for i in range(clients)]
            p_pos = [stream.read_int(f"P{i} Pos") for i in range(clients)]
            if version >= 226:
                for _ in range(clients): stream.read_string("Skip Args")
            
            players = []
            for i in range(clients):
                raw = p_names[i]
                priv = "none"
                match = PRIV_PATTERN.search(raw.lower())
                if match: priv = match.group(1) if match.group(1) in PRIVILEGE_NAMES else "none"
                players.append(Player(p_pos[i], strip_player_data(raw), raw, priv))

            if debug:
                print("\n--- HEX DUMP ---")
                print(hexdump(data))
                print("-" * 50)

            # Choose correct time-left depending on protocol
            effective_time_left = time_left_var if version >= 226 else tr

            return Status(clients, mc, uncolor_string(m_name),
                          GAME_MODES[g_mode_c] if 0 <= g_mode_c < len(GAME_MODES) else "unknown",
                          MASTER_MODES[mm_c] if 0 <= mm_c < len(MASTER_MODES) else "unknown",
                          tr, effective_time_left, muts, vars, mods, version, br, maj, minr, pat, platform, arch, state, players, data)
    except Exception:
        return None

def process_server_data(server, debug=False):
    status = fetch_server_status(server.ip, server.port, debug)
    s_json = {
        "name": server.name, "ip_port": f"{server.ip}:{server.port}", "protocol": 0,
        "version_major": 0, "version_minor": 0, "version_patch": 0, "version_full": "N/A",
        "players": 0, "max_players": 0, "map": "Offline/Unknown", "gamemode": "UNKNOWN",
        "mastermode": "UNKNOWN", "timeremaining_seconds": -1, "timeremaining_formatted": "N/A",
        "mutators": [],
        "vars": 0,
        "mods": 0,
        "platform": "unix", "arch": 0, "state": "play", "timeleft": -1,
        "branch": server.branch, "location": "Unknown", "player_list_data": []
    }
    
    if status:
        # Version logic
        is_above_200 = False
        if (status.major_version > 2) or \
           (status.major_version == 2 and status.minor_version > 0) or \
           (status.major_version == 2 and status.minor_version == 0 and status.patch_version > 0):
            is_above_200 = True

        p_list = []
        for p in status.players:
            p_int, p_hex, t_int, t_hex = extract_colors(p.raw_name)
            
            # Color/team logic
            final_team_hex = t_hex
            final_team_int = t_int
            final_css = generate_css_filter(p_hex)
            team_val = ""
            
            p_hex_clean = p_hex.lstrip('#').lower()
            t_hex_clean = t_hex.lstrip('#').lower()

            if is_above_200:
                if p_hex_clean == "808080":
                    # Neutral -> Grey #808080
                    final_team_hex, final_team_int = "#808080", 0x808080
                    final_css = generate_css_filter(final_team_hex)
                    team_val = "neutral"
                elif p_hex_clean == "f03030":
                    # Omega -> Red #F03030
                    final_team_hex, final_team_int = "#f03030", 0xF03030
                    final_css = generate_css_filter(final_team_hex)
                    team_val = "omega"
                elif p_hex_clean == "3030f0":
                    # Alpha -> Blue #3030F0
                    final_team_hex, final_team_int = "#3030f0", 0x3030F0
                    final_css = generate_css_filter(final_team_hex)
                    team_val = "alpha"
            else:
                if t_hex_clean in ["707070", "90a090"]:
                    # Neutral -> Grey #808080
                    final_team_hex, final_team_int = "#808080", 0x808080
                    final_css = generate_css_filter(final_team_hex)
                    team_val = "neutral"
                elif t_hex_clean in ["ff3210", "ff4f44"]:
                    # Omega -> Red #F03030
                    final_team_hex, final_team_int = "#f03030", 0xF03030
                    final_css = generate_css_filter(final_team_hex)
                    team_val = "omega"
                elif t_hex_clean in ["1040f8", "5f66ff"]:
                    # Alpha -> Blue #3030F0
                    final_team_hex, final_team_int = "#3030f0", 0x3030F0
                    final_css = generate_css_filter(final_team_hex)
                    team_val = "alpha"
            p_list.append({
                "name": p.name, "privilege": p.privilege, "raw_name": p.raw_name,
                "raw_player_int": p_int, "player_color_hex": p_hex, "player_color_css": final_css,
                "raw_team_int": final_team_int, "team_color_hex": final_team_hex, "team": team_val
            })
            
        v_full = f"{status.major_version}.{status.minor_version}.{status.patch_version}" if status.version >= 226 else "N/A"
        s_json.update({
            "protocol": status.version, "version_major": status.major_version,
            "version_minor": status.minor_version, "version_patch": status.patch_version,
            "version_full": v_full, "players": status.clients, "max_players": status.max_clients,
            "map": status.map_name, "gamemode": status.game_mode.upper(), "mastermode": status.master_mode,
            "timeremaining_seconds": status.time_remaining,
            "timeremaining_formatted": time.strftime('%H:%M:%S', time.gmtime(max(0, status.time_remaining))),
            "mutators": get_mutator_names(status.mutators, status.game_mode),
            "vars": status.vars,
            "mods": status.mods,
            "platform": map_platform_to_label(status.platform),
            "arch": status.arch,
            "state": map_state_to_label(status.state),
            "timeleft": status.time_left,
            "branch": status.branch or server.branch, "player_list_data": p_list
        })
    
    # Use cached IP lookup
    s_json['location'] = ip_to_country(server.ip)
    return s_json

# ==========================================
#                   MAIN
# ==========================================

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-d', '--debug', action='store_true')
    global ARGS
    ARGS = parser.parse_args()
    
    # --- Check Discord Connection (Buffered Output) ---
    discord_debug_result = None

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    
    # --- 0. Load IP cache ---
    if IP_CACHE_FILE.exists():
        try:
            with open(IP_CACHE_FILE, 'r', encoding='utf-8') as f:
                IP_CACHE.update(json.load(f))
            if ARGS.debug: print(f"[DEBUG-IP-Cache] Loaded {len(IP_CACHE)} cached locations.")
        except Exception as e:
            if ARGS.debug: print(f"[DEBUG-IP-Cache] Failed to load IP cache: {e}")

    # --- 1. Generate maps JSON ---
    if MAPS_DIR.exists():
        maps = sorted([f.stem.lower() for f in MAPS_DIR.glob('*.png')])
        with open(MAPS_FILE, 'w') as f: json.dump(maps, f, indent=4)

    # --- 2. Fetch master list ---
    try:
        with socket.create_connection((MASTER_HOST, MASTER_PORT), TIMEOUT_TCP) as sock:
            sock.sendall(b"update\n")
            data = b''
            while True:
                chunk = sock.recv(4096)
                if not chunk: break
                data += chunk
            raw_list = data.decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Failed to fetch master list: {e}")
        return

    servers = []
    for line in raw_list.splitlines():
        if line.startswith("addserver "):
            p = line.split(' ', 4)
            if len(p) >= 5:
                res = shlex.split(p[4].strip())
                if len(res) >= 4:
                    servers.append(Server(p[1], int(p[2]), uncolor_string(res[0]), res[3]))

    # --- 3. Process Servers (UDP) ---
    final = [process_server_data(s, ARGS.debug) for s in servers]
    final.sort(key=lambda s: (-s.get('players', 0), s.get('name', '')))
    
    # --- 4. Notification logic ---
    existing_notify = {}
    if Path(NOTIFY_FILE).exists():
        try:
            with open(NOTIFY_FILE, 'r', encoding='utf-8') as f:
                old_data = json.load(f)
                for entry in old_data:
                    key = f"{entry['name']}|{entry['server']}"
                    existing_notify[key] = entry['jointime']
        except json.JSONDecodeError:
            if ARGS.debug: print("Warning: notify.json was corrupted. Resetting notification history.")
            existing_notify = {}
        except Exception as e:
            if ARGS.debug: print(f"Error loading existing notify data: {e}")

    notify_list = []
    utc_now = int(datetime.now(timezone.utc).timestamp())

    # --- Version logic ---
    target_major = -1
    target_minor = -1
    target_patch = -1
    
    found_master_by_name = False
    best_ver_tuple = (-1, -1, -1)

    target_ip_port = ""
    try:
        master_ip = socket.gethostbyname(MASTER_HOST)
        target_ip_port = f"{master_ip}:{MASTER_PORT}"
    except Exception as e:
        if ARGS.debug: print(f"Could not resolve Master Host IP: {e}")

    for s in final:
        s_maj = s.get('version_major', 0)
        s_min = s.get('version_minor', 0)
        s_pat = s.get('version_patch', 0)
        current_tuple = (s_maj, s_min, s_pat)

        if current_tuple > best_ver_tuple and current_tuple != (0,0,0):
            best_ver_tuple = current_tuple

        match_by_ip = (s.get('ip_port') == target_ip_port)
        match_by_name = (MASTER_HOST in s.get('name', ''))

        if match_by_ip or match_by_name:
            target_major = s_maj
            target_minor = s_min
            target_patch = s_pat
            found_master_by_name = True
            if ARGS.debug:
                method = "IP" if match_by_ip else "Name-Substring"
                print(f"[DEBUG-Version-logic] Found Master Server ({method}): {s.get('name')} -> {target_major}.{target_minor}.{target_patch}")
            break

    if not found_master_by_name and best_ver_tuple != (-1, -1, -1):
        target_major, target_minor, target_patch = best_ver_tuple
        if ARGS.debug: print(f"[DEBUG-Version-logic] Master not found. Fallback to highest version: {target_major}.{target_minor}.{target_patch}")

    for server_data in final:
        s_maj = server_data.get('version_major', 0)
        s_min = server_data.get('version_minor', 0)
        s_pat = server_data.get('version_patch', 0)
        
        if s_maj == 0 and s_min == 0 and s_pat == 0:
            continue
        
        if target_major != -1 and (s_maj == target_major and s_min == target_minor and s_pat == target_patch):
            server_name = server_data.get('name', 'Unknown')
            if 'player_list_data' in server_data:
                for player in server_data['player_list_data']:
                    p_name = player.get('name', 'Unknown')
                    session_key = f"{p_name}|{server_name}"

                    if session_key in existing_notify:
                        join_time = existing_notify[session_key]
                    else:
                        join_time = utc_now
                        # --- Discord bot trigger ---
                        if DISCORD_BOT == 1:
                            send_discord_webhook(p_name, server_data)
                    
                    map_name = server_data.get('map', 'Unknown')
                    mode_name = server_data.get('gamemode', 'UNKNOWN')
                    notify_list.append({
                        "name": p_name,
                        "server": server_name,
                        "jointime": join_time,
                        "map": map_name,
                        "mode": mode_name
                    })

    # --- Prepare Discord debug using real data ---
    if ARGS.debug:
        sample_player = None
        sample_server_data = None
        
        if notify_list:
            sample_player = notify_list[0]['name']
            s_name = notify_list[0]['server']
            # Find the full server object
            for s in final:
                if s.get('name') == s_name:
                    sample_server_data = s
                    break
        else:
            # Fallback: search any server for a player
            for s in final:
                pld = s.get('player_list_data', [])
                if pld:
                    sample_player = pld[0].get('name', 'Unknown')
                    sample_server_data = s
                    break
        
        if sample_player and sample_server_data:
            discord_debug_result = run_discord_debug_check(sample_player, sample_server_data)
        else:
            discord_debug_result = "[DEBUG-Discord-weebhook] Skipped: No players found to test webhook."

    # --- 5. Save output ---
    try:
        with open(IP_CACHE_FILE, 'w', encoding='utf-8') as f:
            json.dump(IP_CACHE, f, indent=4)

        notify_str = json.dumps(notify_list, indent=4)
        with open(NOTIFY_FILE, 'w', encoding='utf-8') as f:
            f.write(notify_str)

        output_str = json.dumps(final, indent=4)
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            f.write(output_str)
            
        time_str = json.dumps({
            "local_time": datetime.now().strftime('%d.%m.%Y %H:%M:%S'),
            "utc_time": datetime.now(timezone.utc).strftime('%d.%m.%Y %H:%M:%S')
        }, indent=4)
        with open(TIME_FILE, 'w') as f:
            f.write(time_str)
        
        # --- Print Discord debug info at the very end ---
        if discord_debug_result:
            print(discord_debug_result)
    except Exception as e:
        print(f"Failed to write output files: {e}")

if __name__ == "__main__":
    main()
