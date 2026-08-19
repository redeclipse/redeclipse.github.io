---
title: Server browser
layout: default
permalink: /servers/
---
{% assign img_player = '/servers/icons/player.png' %}
{% assign img_servers = '/servers/icons/list.png' %}
{% assign img_master_full = '/servers/mastermode/disconnect.png' %}
{% assign img_master_open = '/servers/mastermode/connect.png' %}
{% assign img_master_veto = '/servers/mastermode/failed.png' %}
{% assign img_master_failed = '/servers/mastermode/failed.png' %}
{% assign img_master_locked = '/servers/mastermode/locked.png' %}
{% assign img_master_private = '/servers/mastermode/locked.png' %}
{% assign img_master_password = '/servers/mastermode/locked.png' %}
{% assign img_master_unknown = '/servers/mastermode/unknown.png' %}
{% assign img_version_icon = '/servers/icons/icon.png' %}
{% assign img_vote = '/servers/icons/vote.png' %}
{% assign img_fallback_map = '/bits/bg2.jpg' %}
{% assign img_question_mark = '/servers/icons/question.png' %}
{% assign img_waiting = '/servers/icons/waiting.png' %}
{% assign img_warning = '/servers/icons/warning.png' %}
{% assign img_mode_capture = '/servers/mode/capture.png' %}
{% assign img_mode_defend = '/servers/mode/defend.png' %}
{% assign img_mode_bomber = '/servers/mode/bomber.png' %}
{% assign img_mode_editing = '/servers/mode/editing.png' %}
{% assign img_mode_demo = '/servers/mode/demo.png' %}
{% assign img_mode_deathmatch = '/servers/mode/deathmatch.png' %}
{% assign img_mode_race = '/servers/mode/speedrun.png' %}
{% assign img_mode_speedrun = '/servers/mode/speedrun.png' %}
{% assign img_mode_unknown = '/servers/mode/unknown.png' %}
{% assign img_mutator_base = '/servers/mutator/' %}
{% assign img_privilege_base = '/servers/privilege/' %}
{% assign img_team_alpha = '/servers/team/alpha.png' %}
{% assign img_team_omega = '/servers/team/omega.png' %}
{% assign img_team_spectator = '/servers/team/spectator.png' %}
{% assign img_location = '/servers/icons/location.png' %}
{% assign img_info = '/servers/icons/info.png' %}
{% assign img_settings = '/servers/icons/settings.png' %}

{% assign steam_link = 'steam://run/967460' %}

{%- assign data_folder = 'data' -%}
{%- assign servers = site.data[data_folder].servers | default: site.data.servers -%}
{%- assign server_times = site.data[data_folder].time | default: site.data.time -%}

{%- comment -%}
  Find a reference version from a server containing 'play.redeclipse.net' to detect outdated servers.
{%- endcomment -%}
{%- assign re_reference_version = nil -%}
{%- for s in servers -%}
  {%- if s.name contains 'play.redeclipse.net' and s.version_full != blank -%}
    {%- assign re_reference_version = s.version_full -%}
    {%- break -%}
  {%- endif -%}
{%- endfor -%}

{%- comment -%}
  Calculate total number of players across all servers.
{%- endcomment -%}
{%- assign total_players = 0 -%}
{%- for s in servers -%}
  {%- assign total_players = total_players | plus: s.players | plus: 0 -%}
{%- endfor -%}

{%- comment -%}
  Count number of active servers with player list data.
{%- endcomment -%}
{%- assign active_servers = 0 -%}
{%- for s in servers -%}
  {%- if s.player_list_data and s.player_list_data.size > 0 -%}
    {%- assign active_servers = active_servers | plus: 1 -%}
  {%- endif -%}
{%- endfor -%}

{%- comment -%}
  Singular/plural label for player count.
{%- endcomment -%}
{%- if total_players == 1 or total_players == 0 -%}
  {%- assign player_label = 'player' -%}
{%- else -%}
  {%- assign player_label = 'players' -%}
{%- endif -%}

{%- comment -%}
  Categorize servers by outdated status and player count fullness to order display.
{%- endcomment -%}
{%- assign not_outdated_filling = '' | split: '' -%}
{%- assign not_outdated_full = '' | split: '' -%}
{%- assign not_outdated_empty = '' | split: '' -%}
{%- assign outdated_filling = '' | split: '' -%}
{%- assign outdated_full = '' | split: '' -%}
{%- assign outdated_empty = '' | split: '' -%}
{%- assign development_filling = '' | split: '' -%}
{%- assign development_full = '' | split: '' -%}
{%- assign development_empty = '' | split: '' -%}

{%- for s in servers -%}
  {%- assign current_players = s.players | plus: 0 -%}
  {%- assign max_players = s.max_players | plus: 0 -%}
  {%- assign is_outdated = false -%}
  {%- if re_reference_version and s.version_full < re_reference_version -%}
    {%- assign is_outdated = true -%}
  {%- endif -%}

  {%- assign is_full = false -%}
  {%- if max_players > 0 and current_players >= max_players -%}
    {%- assign is_full = true -%}
  {%- endif -%}

  {%- assign is_development = false -%}
  {%- if re_reference_version and s.version_full > re_reference_version -%}
    {%- assign is_development = true -%}
  {%- endif -%}

  {%- if is_outdated == false and is_development == false -%}
    {%- if is_full -%}
      {%- assign not_outdated_full = not_outdated_full | push: s -%}
    {%- elsif current_players > 0 and current_players < max_players -%}
      {%- assign not_outdated_filling = not_outdated_filling | push: s -%}
    {%- else -%}
      {%- assign not_outdated_empty = not_outdated_empty | push: s -%}
    {%- endif -%}
  {%- elsif is_development -%}
    {%- if is_full -%}
      {%- assign development_full = development_full | push: s -%}
    {%- elsif current_players > 0 and current_players < max_players -%}
      {%- assign development_filling = development_filling | push: s -%}
    {%- else -%}
      {%- assign development_empty = development_empty | push: s -%}
    {%- endif -%}
  {%- else -%}
    {%- if is_full -%}
      {%- assign outdated_full = outdated_full | push: s -%}
    {%- elsif current_players > 0 and current_players < max_players -%}
      {%- assign outdated_filling = outdated_filling | push: s -%}
    {%- else -%}
      {%- assign outdated_empty = outdated_empty | push: s -%}
    {%- endif -%}
  {%- endif -%}
{%- endfor -%}

{%- comment -%}
  Sort 'filling' groups by descending player count.
{%- endcomment -%}
{%- assign not_outdated_filling = not_outdated_filling | sort: 'players' | reverse -%}
{%- assign outdated_filling = outdated_filling | sort: 'players' | reverse -%}
{%- assign development_filling = development_filling | sort: 'players' | reverse -%}

{%- comment -%}
  Sort outdated_empty by version descending.
{%- endcomment -%}
{%- assign outdated_empty = outdated_empty | sort: 'version_full' | reverse -%}
{%- assign development_empty = development_empty | sort: 'version_full' | reverse -%}

{%- comment -%}
  Split not_outdated_full and outdated_full into top3 and rest for prioritized display.
{%- endcomment -%}
{%- assign not_outdated_full_top3 = '' | split: '' -%}
{%- assign not_outdated_full_rest = '' | split: '' -%}
{%- for s in not_outdated_full -%}
  {%- if forloop.index0 < 3 -%}
    {%- assign not_outdated_full_top3 = not_outdated_full_top3 | push: s -%}
  {%- else -%}
    {%- assign not_outdated_full_rest = not_outdated_full_rest | push: s -%}
  {%- endif -%}
{%- endfor -%}

{%- assign outdated_full_top3 = '' | split: '' -%}
{%- assign outdated_full_rest = '' | split: '' -%}
{%- for s in outdated_full -%}
  {%- if forloop.index0 < 3 -%}
    {%- assign outdated_full_top3 = outdated_full_top3 | push: s -%}
  {%- else -%}
    {%- assign outdated_full_rest = outdated_full_rest | push: s -%}
  {%- endif -%}
{%- endfor -%}

{%- assign development_full_top3 = '' | split: '' -%}
{%- assign development_full_rest = '' | split: '' -%}
{%- for s in development_full -%}
  {%- if forloop.index0 < 3 -%}
    {%- assign development_full_top3 = development_full_top3 | push: s -%}
  {%- else -%}
    {%- assign development_full_rest = development_full_rest | push: s -%}
  {%- endif -%}
{%- endfor -%}

{%- comment -%}
  Compose final ordered servers list.
{%- endcomment -%}
{%- assign servers = not_outdated_filling | concat: not_outdated_full_top3 | concat: not_outdated_empty | concat: not_outdated_full_rest | concat: development_filling | concat: development_full_top3 | concat: development_empty | concat: development_full_rest | concat: outdated_filling | concat: outdated_full_top3 | concat: outdated_empty | concat: outdated_full_rest -%}

<div class="server-header-line" style="display:flex; align-items:center; gap:12px; background:transparent;">
  <h1 style="margin:0;">Server browser</h1>
  
  <div style="margin-left:auto; display:flex; align-items:center; gap:10px;">
    
    <div class="notifications-box" title="Turn notifications on" style="display:flex; align-items:center; gap:6px; background:#111; color:#fff; padding:6px 15px; border-radius:50px; box-shadow: 0 0 4px rgba(0,0,0,0.4); border: 1px solid #cccccc;">
        <label for="notif-toggle" style="display:flex; align-items:center; gap:6px; cursor: help; margin:0;">
            <img src="{{ img_info }}" alt="" style="height:1.1em; width:auto; filter: drop-shadow(0 0 2px #000);">
            <span class="header-responsive-label">Notifications</span>
        </label>
        
        <label class="switch">
            <input type="checkbox" id="notif-toggle">
            <span class="slider round"></span>
        </label>
    </div>

    <div class="settings-menu-container" style="position:relative;">
      <button id="server-settings-button" class="server-settings-button" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="settings-dropdown" title="Settings" style="display:inline-flex; align-items:center; gap:6px; background:#920504; color:#fff; border:1px solid #cccccc; padding:6px 15px; border-radius:50px; cursor:pointer; box-shadow: 0 0 4px rgba(0,0,0,0.4); outline: none;">
        <img src="{{ img_settings }}" alt="Settings" style="height:1.1em; vertical-align:middle; filter: drop-shadow(0 0 2px #000);">
        <span class="header-responsive-label">Settings</span>
      </button>
      <div id="settings-dropdown" class="settings-dropdown" role="menu" aria-hidden="true">
        <label class="settings-item" title="Use the direct link to launch Red Eclipse directly instead of opening Steam">
          <input type="checkbox" id="opt-legacy-connect">
          <span>Legacy connect</span>
        </label>
        <label class="settings-item" title="Receive notifications only when the player count exceeds the specific threshold">
          <input type="checkbox" id="opt-less-notifications">
          <span>Less notifications</span>
        </label>
        <div class="settings-subitem" id="less-notifications-slider" style="display: none;">
          <div class="settings-subitem-row">
            <input type="range" id="opt-less-notifications-threshold" min="1" max="10" step="1" value="1" aria-label="Player online" title="Set player count threshold">
            <span class="settings-subitem-value" id="opt-less-notifications-threshold-value">1</span>
          </div>
          <div class="settings-subitem-caption" title="Set player count threshold"><img src="{{ img_player }}" alt="Players" style="height:1.1em; vertical-align:middle; margin-right:0px;">Player online</div>
        </div>
      </div>
    </div>
    
  </div>
</div>

{%- assign total_server_count = site.data.servers.size -%}
<div class="server-stats-info" style="margin-bottom:0px;font-size:1.07em;font-weight:500;color:#fff;">
  <img src="{{ img_player }}" alt="Players Icon" style="height:1.2em;vertical-align:middle;margin-right:4px;">{{ total_players }} {{ player_label }} on <img src="{{ img_servers }}" alt="Servers Icon" style="height:1.2em;vertical-align:middle;margin-right:4px;">{{ active_servers }} out of {{ total_server_count }} servers
</div>

{%- assign available_maps = site.data.maps | default: '' -%}
{% assign fallback_image_url = img_fallback_map %}

<div class="server-table-wrap">
<table id="server-list">
    <tbody>
    
    {%- if servers -%}
        {%- for server in servers -%}

        {%- comment -%}
          Assign current and max players once per server for DRY.
        {%- endcomment -%}
        {% assign current_players = server.players | plus: 0 %}
        {% assign max_players = server.max_players | plus: 0 %}

        {% comment %}
          Calculate occupancy percentage safely.
        {% endcomment %}
        {% if max_players > 0 %}
            {% assign occupancy_percentage = current_players | times: 100 | divided_by: max_players %}
        {% else %}
            {% assign occupancy_percentage = 0 %}
        {% endif %}

        {% comment %}
          Determine player count color class and hover text.
        {% endcomment %}
        {% assign player_color_class = "empty" %}
        {% assign player_hover_text = occupancy_percentage | append: "%" %}

        {% if current_players >= max_players and max_players > 0 %}
            {% assign player_color_class = "full" %}
            {% assign player_hover_text = "Full" %}
        {% elsif occupancy_percentage >= 80 %}
            {% assign player_color_class = "high" %}
        {% elsif occupancy_percentage >= 50 %}
            {% assign player_color_class = "medium" %}
        {% elsif current_players == 0 %}
            {% assign player_color_class = "empty" %}
        {% else %}
            {% assign player_color_class = "low" %}
        {% endif %}

        {% comment %}
          Determine map image URL and background style once.
        {% endcomment %}
        {% assign map_name_lower = server.map | downcase %}
        {% assign map_filename = map_name_lower | append: ".png" %}

        {% assign background_url = fallback_image_url %}
        {% if available_maps contains map_name_lower %}
            {% assign background_url = "/maps/" | append: map_filename %}
        {% endif %}

        {% assign background_style = 'background: url(' | append: background_url | append: '); background-size: cover; background-position: center; background-repeat: no-repeat;' %}

        {% comment %}
          Determine outdated and active status booleans once.
        {% endcomment %}
        {% assign is_outdated = false %}
        {% if re_reference_version and server.version_full < re_reference_version %}
          {% assign is_outdated = true %}
        {% endif %}
        {% assign is_development = false %}
        {% if re_reference_version and server.version_full > re_reference_version %}
          {% assign is_development = true %}
        {% endif %}
        {% assign is_active = false %}
        {% if is_outdated == false %}
          {% assign is_active = true %}
        {% endif %}

        {% assign is_full = false %}
        {% if current_players >= max_players and max_players > 0 %}
          {% assign is_full = true %}
        {% endif %}

        {% assign map_cell_active_class = '' %}
        {% if is_active %}
          {% assign map_cell_active_class = 'active-map-cell' %}
        {% endif %}

        <tr>
            <td style="text-align: center;" class="players-count-cell">
                <div class="player-count" title="{{ player_hover_text }}">
                    <span class="current {{ player_color_class }}">{{ current_players }}</span>
                    <span class="separator">/</span>
                    <span class="max">{{ max_players }}</span>
                </div>

                {% assign mm = server.mastermode | downcase | strip %}
                <div class="mastermode-hover" style="cursor: help; margin-bottom: 5px;" title="Mastermode">
                    <div class="mastermode-icon-row">
                        {% if is_full %}
                          <img src="{{ img_master_full }}" alt="Full" style="height:1.8em;vertical-align:middle;" />
                        {% elsif mm == 'open' %}
                          <img src="{{ img_master_open }}" alt="Open" style="height:1.8em;vertical-align:middle;" />
                        {% elsif mm == 'veto' %}
                          <img src="{{ img_master_veto }}" alt="Veto" style="height:1.8em;vertical-align:middle;" />
                        {% elsif mm == 'locked' or mm == 'private' or mm == 'password' %}
                          {% if mm == 'locked' %}
                            <img src="{{ img_master_locked }}" alt="Locked" style="height:1.8em;vertical-align:middle;" />
                          {% elsif mm == 'private' %}
                            <img src="{{ img_master_private }}" alt="Private" style="height:1.8em;vertical-align:middle;" />
                          {% else %}
                            <img src="{{ img_master_password }}" alt="Password" style="height:1.8em;vertical-align:middle;" />
                          {% endif %}
                        {% elsif mm == 'unknown' %}
                          <img src="{{ img_master_unknown }}" alt="Unknown" style="height:1.8em;vertical-align:middle;" />
                        {% endif %}
                    </div>
                    <div class="mastermode-display mastermode-{{ mm }}">
                        {% if is_full %}
                          <strong class="full-pulse">Full</strong>
                        {% else %}
                          <strong>{{ server.mastermode | capitalize | escape }}</strong>
                        {% endif %}
                    </div>
                </div>

                {%- assign display_branch = server.branch | strip | downcase -%}
                {%- if display_branch == '?' or display_branch == '' -%}
                  {%- assign display_branch = 'unknown' -%}
                {%- endif -%}
                {%- assign tooltip_text = 'Version: ' | append: server.version_full | append: '-' | append: server.platform | append: server.arch | append: '-' | append: display_branch | append: '; Protocol: ' | append: server.protocol -%}
                <div class="version-display-stacked version-hover-help" title="{{ tooltip_text }}">
                    <img src="{{ img_version_icon }}" alt="Version Icon" style="display:block; margin:auto; height:2.2em; margin-bottom: 4px;">
                    {% if is_outdated %}
                      <strong class="version-white-strong version-outdated">{{ server.version_full | escape }}</strong>
                    {% else %}
                      <strong class="version-white-strong">{{ server.version_full | escape }}</strong>
                    {% endif %}
                </div>
                 {% if is_outdated %}
                  <div class="unsupported-version-pulse-stacked" title="Outdated version; not recommended or supported">Outdated</div>
                {% elsif is_development %}
                  <div class="development-version-pulse-stacked" title="Development version; use not recommended">Development</div>
                {% endif %}
            </td>

            <td class="map-cell {{ map_cell_active_class }}{% if is_full %} is-full{% endif %}{% if is_outdated %} is-outdated{% endif %}{% if is_development %} is-development{% endif %}" style="position:relative; padding:0; overflow:hidden;">
                                
                {% comment %}
                  Unified map background wrapper for all states to follow DRY principle.
                {% endcomment %}
                <div class="map-cell-bg-wrapper" style="{{ background_style }} width:100%; height:100%; position:absolute; top:0; left:0; right:0; bottom:0; transition: filter 0.25s ease;">
                  {% if background_url == img_fallback_map %}
                    <div class="bg2-question-center">
                      <img src="{{ img_question_mark }}" alt="Unknown map" class="bg2-question-icon" />
                    </div>
                  {% endif %}
                </div>
                
                <h3 class="map-title-overlay" style="margin:0; line-height:1.2;">
                    <span style="font-size:1.2em; font-weight:bold; color:#fff; text-shadow: 1px 1px 6px #d32f2f;">
                      {{ server.map | capitalize | escape }}
                    </span>
                </h3>

                {% if is_active %}
                  {% if is_full == false and is_outdated == false and is_development == false %}
                  <a href="{{ steam_link }}" class="map-cell-connect-overlay" data-ip-port="{{ server.ip_port | escape }}" data-steam-href="{{ steam_link }}" data-legacy-href="redeclipse://{{ server.ip_port | escape }}" aria-hidden="true" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; z-index: 15; text-decoration: none;">
                    <div class="connect-content" style="background: #000; padding: 8px 12px; border-radius: 8px; display: flex; align-items: center; gap: 8px; cursor: pointer;">
                      <img src="{{ img_master_open }}" alt="Connect" style="height:1.6em; vertical-align:middle;" />
                      <div class="connect-label" style="color: #4CAF50; font-weight: bold; font-size: 1.4em; animation: pulseGreen 1.2s infinite cubic-bezier(.4,0,.6,1); text-shadow: 1px 1px 3px rgba(0,0,0,0.7);">Connect</div>
                    </div>
                  </a>
                  {% endif %}
                {% endif %}

                {% if is_full %}
                  <div class="map-cell-full-overlay" aria-hidden="true">
                    <div class="full-content">
                      <img src="{{ img_master_full }}" alt="Full" style="height:1.8em;vertical-align:middle;" />
                      <div class="full-label">Full</div>
                    </div>
                  </div>
                {% endif %}

                {% if is_outdated %}
                  {% if is_full == false %}
                    <div class="map-cell-outdated-overlay" aria-hidden="true">
                      <div class="outdated-content">
                        <img src="{{ img_warning }}" alt="Outdated" style="height:1.6em;vertical-align:middle;" />
                        <div class="outdated-label">Outdated</div>
                      </div>
                    </div>
                  {% endif %}
                {% endif %}
                {% if is_development %}
                  {% if is_full == false %}
                    <div class="map-cell-development-overlay" aria-hidden="true">
                      <div class="development-content">
                        <img src="{{ img_info }}" alt="Development" style="height:1.6em;vertical-align:middle;" />
                        <div class="development-label">Development</div>
                      </div>
                    </div>
                  {% endif %}
                {% endif %}
{% comment %}
  Format time left display from seconds.
{% endcomment %}
{% assign total_seconds = server.timeremaining_seconds | plus: 0 %}
{% assign hours = total_seconds | divided_by: 3600 %}
{% assign minutes = total_seconds | modulo: 3600 | divided_by: 60 %}
{% assign seconds = total_seconds | modulo: 60 %}

{% assign server_state = server.state | default: '' | downcase | strip %}

{% comment %}
  Build title text or No time limit.
{% endcomment %}
{% if total_seconds == -1 %}
  {% assign time_title_text = 'No time limit' %}
{% else %}
  {% capture computed_time %}{% if hours > 0 %}{{ hours }}h {% endif %}{{ minutes }}m {{ seconds }}s{% endcapture %}
  {% assign time_title_text = 'Ends in' %}
{% endif %}

{% if server_state == 'initialising' %}
  {% assign time_title_text = 'Initialising' %}
{% elsif server_state == 'vote' %}
  {% assign time_title_text = 'Voting' %}
{% endif %}

            </td>

            <td class="server-details-cell" style="min-width: 250px;">

                {% comment %}
                  Resolve vars/mods counts from server data.
                {% endcomment %}
                {% assign vars_count = server.vars_count | default: nil %}
                {% if vars_count == nil or vars_count == '' %}
                  {% assign vars_num = server.vars | plus: 0 %}
                  {% assign vars_str = server.vars | append: '' | strip %}
                  {% if vars_str == '' %}
                    {% assign vars_count = 0 %}
                  {% elsif vars_num > 0 or vars_str == '0' %}
                    {% assign vars_count = vars_num %}
                  {% else %}
                    {% assign vars_clean = vars_str | remove: '[' | remove: ']' | remove: '"' %}
                    {% assign vars_items = vars_clean | split: ',' %}
                    {% assign vars_count = 0 %}
                    {% for it in vars_items %}
                      {% assign t = it | strip %}
                      {% if t != '' %}
                        {% assign vars_count = vars_count | plus: 1 %}
                      {% endif %}
                    {% endfor %}
                  {% endif %}
                {% else %}
                  {% assign vars_count = vars_count | plus: 0 %}
                {% endif %}

                {% assign mods_count = server.mods_count | default: nil %}
                {% if mods_count == nil or mods_count == '' %}
                  {% assign mods_num = server.mods | plus: 0 %}
                  {% assign mods_str = server.mods | append: '' | strip %}
                  {% if mods_str == '' %}
                    {% assign mods_count = 0 %}
                  {% elsif mods_num > 0 or mods_str == '0' %}
                    {% assign mods_count = mods_num %}
                  {% else %}
                    {% assign mods_clean = mods_str | remove: '[' | remove: ']' | remove: '"' %}
                    {% assign mods_items = mods_clean | split: ',' %}
                    {% assign mods_count = 0 %}
                    {% for it2 in mods_items %}
                      {% assign t2 = it2 | strip %}
                      {% if t2 != '' %}
                        {% assign mods_count = mods_count | plus: 1 %}
                      {% endif %}
                    {% endfor %}
                  {% endif %}
                {% else %}
                  {% assign mods_count = mods_count | plus: 0 %}
                {% endif %}

                <h3 class="server-name-title" title="{{ server.ip_port | escape }}&#10;{{ vars_count }} Variables {{ mods_count }}% modified" style="color:#fff;">{{ server.name | truncate: 46 | escape }}</h3>

                <div class="server-location" title="Server location" style="margin-top: 0px; margin-bottom: 1px; color:#fff;">
                    <span class="location-hover-help" style="display:inline-flex;align-items:center;font-weight:bold;color:#fff;font-size:1.0em;">
                      <img src="{{ img_location }}" alt="Location Icon" style="height:1.1em;vertical-align:middle;margin-right:5px;" />
                      {{ server.location | escape }}
                    </span>
                </div>

                {% assign mode_words = server.gamemode | replace: '-', ' ' | strip | downcase | split: ' ' %}
                {% assign minor_words = "a, an, the, and, but, or, for, nor, so, yet, as, at, by, for, in, of, off, on, per, to, up, with" | split: ', ' %}
                {% assign final_mode_words = "" | split: '' %}
                
                {% for word in mode_words %}
                    {% assign current_word = word | strip %}
                    {% if current_word == blank %}
                        {% continue %}
                    {% endif %}
                    
                    {% assign capitalize_word = true %}
                    
                    {% if forloop.index > 1 and minor_words contains current_word %}
                        {% assign capitalize_word = false %}
                    {% endif %}
                    
                    {% if capitalize_word %}
                        {% assign final_format = current_word | capitalize %}
                    {% else %}
                        {% assign final_format = current_word %}
                    {% endif %}
                    
                    {% assign final_mode_words = final_mode_words | push: final_format %}
                {% endfor %}
                
                {% assign title_cased_mode = final_mode_words | join: ' ' %}

                {% assign modename = server.gamemode | default: 'unknown' | downcase | strip | replace: '_', ' ' | replace: '-', ' ' | split: ' ' | first %}
                {% if modename == '' or modename == '?' %}
                  {% assign modename = 'unknown' %}
                {% endif %}

                {% assign raw_mode = server.gamemode | downcase | strip %}
                {% assign mode_key = raw_mode | replace: '-', ' ' | replace: '_', ' ' | replace: ' ', ' ' | strip %}

                <div class="gamemode-line-row gamemode-hover-help" title="Mode" style="color:#fff; font-size: 1em; font-weight: bold; margin-top: 3px; margin-bottom: 2px;">
                    <span style="color:#fff; font-weight: bold; font-size: 1em; display: inline-flex; align-items: center;">
                        {% assign mode_label = title_cased_mode %}
                        {% if mode_key contains 'capture' and mode_key contains 'flag' %}
                          <img src="{{ img_mode_capture }}" alt="Capture the Flag" style="height:1.1em;vertical-align:middle;margin-right:5px;" />
                        {% elsif mode_key contains 'defend' and mode_key contains 'control' %}
                          <img src="{{ img_mode_defend }}" alt="Defend and Control" style="height:1.1em;vertical-align:middle;margin-right:5px;" />
                        {% elsif mode_key contains 'bomber' %}
                          <img src="{{ img_mode_bomber }}" alt="Bomber Ball" style="height:1.1em;vertical-align:middle;margin-right:5px;" />
                        {% elsif mode_key == 'edit' or mode_key == 'editing' %}
                          <img src="{{ img_mode_editing }}" alt="Edit" style="height:1.1em;vertical-align:middle;margin-right:5px;" />
                        {% elsif mode_key == 'demo' %}
                          <img src="{{ img_mode_demo }}" alt="Demo" style="height:1.1em;vertical-align:middle;margin-right:5px;" />
                        {% elsif mode_key == 'deathmatch' %}
                          <img src="{{ img_mode_deathmatch }}" alt="Deathmatch" style="height:1.1em;vertical-align:middle;margin-right:5px;" />
                        {% elsif mode_key == 'race' %}
                          <img src="{{ img_mode_race }}" alt="Race" style="height:1.1em;vertical-align:middle;margin-right:5px;" />
                        {% elsif mode_key == 'speedrun' %}
                          <img src="{{ img_mode_speedrun }}" alt="Speedrun" style="height:1.1em;vertical-align:middle;margin-right:5px;" />
                        {% else %}
                          <img src="{{ img_mode_unknown }}" alt="Unknown" style="height:1.1em;vertical-align:middle;margin-right:5px;" />
                          {% assign mode_label = 'Unknown' %}
                        {% endif %}
                        {{ mode_label | escape }}
                    </span>
                </div>

                {% comment %}
                  Parse mutators list and display with icons.
                {% endcomment %}
                {% assign raw_string = server.mutators | strip %}
                {% assign pre_cleaned_string = raw_string | remove: '"' | remove: '[' | remove: ']' | replace: '-', ',' %}
                {% assign mutator_array = pre_cleaned_string | split: ',' %}

                {% assign mutator_count = mutator_array | size %}

                {% if mutator_count > 0 %}
                <div class="mutators-display-container mutators-hover-help" title="Mutator" style="color:#fff; font-weight: bold; font-size: 1em; margin-top: 0; margin-bottom: 0; display: flex; flex-wrap: wrap; gap: 3px 10px;">
                    {% for mutator in mutator_array %}
                        {% assign stripped_mutator = mutator | strip %}
                        {% if stripped_mutator != blank %}
                            {% assign downcased_mutator = stripped_mutator | downcase %}
                            <span class="mutator-hover-help gamemode-hover-help" style="display: inline-flex; align-items: center; margin-top: 0; margin-bottom: 0;">
                              <img src="{{ img_mutator_base }}{{ modename }}/{{ mutator | downcase | strip }}.png" alt="{{ stripped_mutator }}" style="height:1.1em;vertical-align:middle;margin-right:5px;">
                              {% if downcased_mutator == 'ffa' %} FFA{% else %} {{ stripped_mutator | capitalize }}{% endif %}
                            </span>
                        {% endif %}
                    {% endfor %}
                </div>
                {% endif %}

                {% comment %}
                  Format time left display from seconds.
                {% endcomment %}
                {% assign total_seconds = server.timeremaining_seconds | plus: 0 %}
                {% assign hours = total_seconds | divided_by: 3600 %}
                {% assign minutes = total_seconds | modulo: 3600 | divided_by: 60 %}
                {% assign seconds = total_seconds | modulo: 60 %}

                {% assign server_state = server.state | default: '' | downcase | strip %}

                {% comment %}
                  Build title text or No time limit.
                {% endcomment %}
                {% if total_seconds == -1 %}
                  {% assign time_title_text = 'No time limit' %}
                {% else %}
                  {% capture computed_time %}{% if hours > 0 %}{{ hours }}h {% endif %}{{ minutes }}m {{ seconds }}s{% endcapture %}
                  {% assign time_title_text = 'Ends in' %}
                {% endif %}

                {% if server_state == 'initialising' %}
                  {% assign time_title_text = 'Initialising' %}
                {% elsif server_state == 'vote' %}
                  {% assign time_title_text = 'Voting' %}
                {% endif %}

                {% assign time_title_text_final = time_title_text %}
                    {% if current_players == 0 %}
                {% assign time_title_text_final = 'Waiting for players; Server is empty in idle' %}
                    {% endif %}
                {% if server_state == 'initialising' %}
                    {% assign time_title_text_final = 'Initialising next match' %}
                {% elsif server_state == 'vote' %}
                    {% assign time_title_text_final = 'Waiting for map suggestions' %}
                {% elsif server_state == 'idle' %}
                    {% assign time_title_text_final = 'Waiting for players; Server is empty in idle' %}
                {% endif %}
                <div class="time-left-container timeleft-hover-help{% if current_players == 0 %} waiting{% endif %}" title="{{ time_title_text_final }}" style="color:#fff; font-weight: bold; font-size: 1em; margin-top: 3px; margin-bottom: 2px; display: block;">
                    {% if server_state == 'initialising' %}
                      <img src="{{ img_settings }}" alt="Initialising" style="height:1.1em;vertical-align:middle;margin-right:5px;">Initialising
                    {% elsif server_state == 'vote' %}
                      <img src="{{ img_vote }}" alt="Voting" style="height:1.1em;vertical-align:middle;margin-right:5px;">Voting
                    {% elsif server_state == 'idle' %}
                      <img src="{{ img_waiting }}" alt="Waiting" style="height:1.1em;vertical-align:middle;margin-right:5px;">Waiting for players
                    {% elsif current_players == 0 %}
                      <img src="{{ img_waiting }}" alt="Waiting" style="height:1.1em;vertical-align:middle;margin-right:5px;">Waiting for players
                    {% else %}
                      <img src="{{ img_waiting }}" alt="Waiting" style="height:1.1em;vertical-align:middle;margin-right:5px;">{% if total_seconds == -1 %}No time limit
                      {% else %}{% if hours > 0 %}{{ hours }}h {% endif %}{{ minutes }}m {{ seconds }}s
                      {% endif %}
                    {% endif %}
                </div>
            </td>
            
            <td class="active-players-cell">
                {%- if server.player_list_data and server.player_list_data.size > 0 -%}

                    {%- assign allowed_privileges = "administrator,developer,founder,localadministrator,localmoderator,localoperator,localsupporter,moderator,none,operator,player,supporter" | split: "," -%}

                    {%- assign alpha_players = '' | split: '' -%}
                    {%- assign omega_players = '' | split: '' -%}
                    {%- assign other_players = '' | split: '' -%}

                    {%- for p in server.player_list_data -%}
                        {%- assign t = p.team | downcase | strip -%}
                        {%- if t == 'alpha' -%}
                            {%- assign alpha_players = alpha_players | push: p -%}
                        {%- elsif t == 'omega' -%}
                            {%- assign omega_players = omega_players | push: p -%}
                        {%- else -%}
                            {%- assign other_players = other_players | push: p -%}
                        {%- endif -%}
                    {%- endfor -%}

                    {%- assign has_teams = false -%}
                    {%- if alpha_players.size > 0 or omega_players.size > 0 -%}
                      {%- assign has_teams = true -%}
                    {%- endif -%}

                    {%- if alpha_players.size > 0 or omega_players.size > 0 -%}
                    <div class="team-columns">
                        {%- if alpha_players.size > 0 -%}
                        <div class="team-column team-alpha">
                            <div class="team-header" title="Alpha">
                                <img src="{{ img_team_alpha }}" alt="Alpha" class="team-icon">
                            </div>
                            <ul>
                                {%- for player in alpha_players -%}
                                    {%- assign normalized_privilege = player.privilege | downcase | strip -%}
                                    {%- unless allowed_privileges contains normalized_privilege -%}
                                        {%- assign normalized_privilege = 'none' -%}
                                    {%- endunless -%}
                                    {% assign privilege_filename = normalized_privilege | append: ".svg" %}
                                    {% assign image_path = img_privilege_base | append: privilege_filename %}

                                    {% assign player_team = player.team | downcase | strip %}
                                    {% assign player_title = 'Player' %}
                                    {% if player_team == 'alpha' %}
                                      {% assign player_title = 'Player in team Alpha' %}
                                    {% elsif player_team == 'omega' %}
                                      {% assign player_title = 'Player in team Omega' %}
                                    {% elsif player_team == 'neutral' and has_teams %}
                                      {% assign player_title = 'Player is in Spectator' %}
                                    {% endif %}

                                    <li>
                                        <img src="{{ image_path }}"
                                                alt="{{ normalized_privilege | capitalize }} icon"
                                                title="{{ normalized_privilege | capitalize }}"
                                                class="player-privilege-help"
                                                style="height: 1.2em; vertical-align: middle; margin-right: 4px; {% if player.player_color_css and player.player_color_css != '' %}filter: {{ player.player_color_css | escape }};{% else %}filter: invert(100%);{% endif %}">

                                        {% if player.team_color_hex and player.team_color_hex != '' %}
                                          <strong class="player-name" title="{{ player_title }}" style="color: #{{ player.team_color_hex | remove: '#' }};{% if player.player_color_hex and player.player_color_hex != '' %} --hover-color: #{{ player.player_color_hex | remove: '#' }};{% endif %}">{{ player.name | escape }}</strong>
                                        {% else %}
                                          <strong class="player-name" title="{{ player_title }}"{% if player.player_color_hex and player.player_color_hex != '' %} style="--hover-color: #{{ player.player_color_hex | remove: '#' }};"{% endif %}>{{ player.name | escape }}</strong>
                                        {% endif %}
                                    </li>
                                {%- endfor -%}
                            </ul>
                        </div>
                        {%- endif -%}

                        {%- if omega_players.size > 0 -%}
                        <div class="team-column team-omega">
                            <div class="team-header" title="Omega">
                                <img src="{{ img_team_omega }}" alt="Omega" class="team-icon">
                            </div>
                            <ul>
                                {%- for player in omega_players -%}
                                    {%- assign normalized_privilege = player.privilege | downcase | strip -%}
                                    {%- unless allowed_privileges contains normalized_privilege -%}
                                        {%- assign normalized_privilege = 'none' -%}
                                    {%- endunless -%}
                                    {% assign privilege_filename = normalized_privilege | append: ".svg" %}
                                    {% assign image_path = img_privilege_base | append: privilege_filename %}

                                    {% assign player_team = player.team | downcase | strip %}
                                    {% assign player_title = 'Player' %}
                                    {% if player_team == 'alpha' %}
                                      {% assign player_title = 'Player in team Alpha' %}
                                    {% elsif player_team == 'omega' %}
                                      {% assign player_title = 'Player in team Omega' %}
                                    {% elsif player_team == 'neutral' and has_teams %}
                                      {% assign player_title = 'Player is in Spectator' %}
                                    {% endif %}

                                    <li>
                                        <img src="{{ image_path }}"
                                                alt="{{ normalized_privilege | capitalize }} icon"
                                                title="{{ normalized_privilege | capitalize }}"
                                                class="player-privilege-help"
                                                style="height: 1.2em; vertical-align: middle; margin-right: 4px; {% if player.player_color_css and player.player_color_css != '' %}filter: {{ player.player_color_css | escape }};{% else %}filter: invert(100%);{% endif %}">

                                        {% if player.team_color_hex and player.team_color_hex != '' %}
                                          <strong class="player-name" title="{{ player_title }}" style="color: #{{ player.team_color_hex | remove: '#' }};{% if player.player_color_hex and player.player_color_hex != '' %} --hover-color: #{{ player.player_color_hex | remove: '#' }};{% endif %}">{{ player.name | escape }}</strong>
                                        {% else %}
                                          <strong class="player-name" title="{{ player_title }}"{% if player.player_color_hex and player.player_color_hex != '' %} style="--hover-color: #{{ player.player_color_hex | remove: '#' }};"{% endif %}>{{ player.name | escape }}</strong>
                                        {% endif %}
                                    </li>
                                {%- endfor -%}
                            </ul>
                        </div>
                        {%- endif -%}

                        {%- if other_players.size > 0 -%}
                        <div class="team-column team-other">
                            <div class="team-header" title="Spectator">
                                <img src="{{ img_team_spectator }}" alt="Spectator" class="team-icon">
                            </div>
                            <ul>
                                {%- for player in other_players -%}
                                    {%- assign normalized_privilege = player.privilege | downcase | strip -%}
                                    {%- unless allowed_privileges contains normalized_privilege -%}
                                        {%- assign normalized_privilege = 'none' -%}
                                    {%- endunless -%}
                                    {% assign privilege_filename = normalized_privilege | append: ".svg" %}
                                    {% assign image_path = img_privilege_base | append: privilege_filename %}

                                    {% assign player_team = player.team | downcase | strip %}
                                    {% assign player_title = 'Player' %}
                                    {% if player_team == 'alpha' %}
                                      {% assign player_title = 'Player in team Alpha' %}
                                    {% elsif player_team == 'omega' %}
                                      {% assign player_title = 'Player in team Omega' %}
                                    {% elsif player_team == 'neutral' and has_teams %}
                                      {% assign player_title = 'Player is in Spectator' %}
                                    {% endif %}

                                    <li>
                                        <img src="{{ image_path }}"
                                                alt="{{ normalized_privilege | capitalize }} icon"
                                                title="{{ normalized_privilege | capitalize }}"
                                                class="player-privilege-help"
                                                style="height: 1.2em; vertical-align: middle; margin-right: 4px; {% if player.player_color_css and player.player_color_css != '' %}filter: {{ player.player_color_css | escape }};{% else %}filter: invert(100%);{% endif %}">

                                        {% if player.team_color_hex and player.team_color_hex != '' %}
                                          <strong class="player-name" title="{{ player_title }}" style="color: #{{ player.team_color_hex | remove: '#' }};{% if player.player_color_hex and player.player_color_hex != '' %} --hover-color: #{{ player.player_color_hex | remove: '#' }};{% endif %}">{{ player.name | escape }}</strong>
                                        {% else %}
                                          <strong class="player-name" title="{{ player_title }}"{% if player.player_color_hex and player.player_color_hex != '' %} style="--hover-color: #{{ player.player_color_hex | remove: '#' }};"{% endif %}>{{ player.name | escape }}</strong>
                                        {% endif %}
                                    </li>
                                {%- endfor -%}
                            </ul>
                        </div>
                        {%- endif -%}
                    </div>
                    {%- else -%}
                    <ul>
                        {%- for player in server.player_list_data -%}
                            {%- assign normalized_privilege = player.privilege | downcase | strip -%}
                            {%- unless allowed_privileges contains normalized_privilege -%}
                                {%- assign normalized_privilege = 'none' -%}
                            {%- endunless -%}
                            {% assign privilege_filename = normalized_privilege | append: ".svg" %}
                            {% assign image_path = img_privilege_base | append: privilege_filename %}

                            {% assign player_team = player.team | downcase | strip %}
                            {% assign player_title = 'Player' %}
                            {% if player_team == 'alpha' %}
                              {% assign player_title = 'Player in team Alpha' %}
                            {% elsif player_team == 'omega' %}
                              {% assign player_title = 'Player in team Omega' %}
                            {% elsif player_team == 'neutral' and has_teams %}
                                {% assign player_title = 'Player is in Spectator' %}
                            {% endif %}

                            <li>
                                <img src="{{ image_path }}"
                                        alt="{{ normalized_privilege | capitalize }} icon"
                                        title="{{ normalized_privilege | capitalize }}"
                                        class="player-privilege-help"
                                        style="height: 1.2em; vertical-align: middle; margin-right: 4px; {% if player.player_color_css and player.player_color_css != '' %}filter: {{ player.player_color_css | escape }};{% else %}filter: invert(100%);{% endif %}">

                                {% if player.team_color_hex and player.team_color_hex != '' %}
                                  <strong class="player-name" title="{{ player_title }}" style="color: #{{ player.team_color_hex | remove: '#' }};{% if player.player_color_hex and player.player_color_hex != '' %} --hover-color: #{{ player.player_color_hex | remove: '#' }};{% endif %}">{{ player.name | escape }}</strong>
                                {% else %}
                                  <strong class="player-name" title="{{ player_title }}"{% if player.player_color_hex and player.player_color_hex != '' %} style="--hover-color: #{{ player.player_color_hex | remove: '#' }};"{% endif %}>{{ player.name | escape }}</strong>
                                {% endif %}
                            </li>
                        {%- endfor -%}
                    </ul>
                    {%- endif -%}
                {%- else -%}
                    <span title="No players; Server is empty in idle" style="cursor: help !important;"><img src="{{ img_player }}" alt="No players" title="No players; Server is empty in idle" style="height:1.2em;vertical-align:middle;margin-right:6px;"><span class="no-players-pulse">No players</span></span>
                {%- endif -%}
            </td>
        </tr>
        {%- endfor -%}
    {%- else -%}
        <tr>
            <td colspan="4">No servers found. Check the script execution and ensure the data file exists at `data/servers.json`.</td>
        </tr>
    {%- endif -%}
    </tbody>
</table>
</div>

<p>
  <span class="last-checked-group" title="Last checked, Server browser Local-Time {{ server_times.local_time }}">
    <span id="last-checked-time" style="font-size:1em; color:#fff; font-style:italic; cursor:help;">
      {{ server_times.utc_time }} UTC
    </span>
  </span>
</p>

<style>
/* --- General Table Styling --- */
#server-list {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    /* table-layout: auto (default) */
    will-change: contents;
}
.server-table-wrap {
    width: 100%;
    overflow-x: auto;
    contain: paint;
    will-change: contents;
}
#server-list tbody {
    will-change: contents;
}
#server-list th, #server-list td {
    padding: 8px 12px;
    border: 1px solid red;
    vertical-align: top;
}
#server-list thead th {
    background-color: #f4f4f4;
    text-align: left;
}

.server-table-wrap {
    width: 100%;
    overflow-x: auto;
    contain: paint;
}

/* --- Players Column Styling --- */
.players-count-cell {
    width: 30px; 
    padding-left: 5px;
    padding-right: 5px;
    font-weight: bold;
    line-height: 1.2;
    min-width: 82px;
}

/* Set player numbers to the same font style; current keeps its color classes */
.player-count .current {
    font-size: 1.2em;
    font-weight: bold;
    text-shadow: none;
}
.player-count .empty { color: #fff; }
.player-count .low { color: #81E17B; }
.player-count .medium { color: #FFC107; }
.player-count .high { color: #FF9800; }
.player-count .full { color: #D32F2F; }
.player-count .max {
    font-size: 1.2em;
    font-weight: bold;
    color: #fff;
    text-shadow: none;
}

/* Player Count Styling */
.player-count {
    display: block; 
    font-size: 1.0em;
    line-height: 1; 
    margin-bottom: 5px; 
    cursor: help; 
}

/* Player count separator */
.player-count .separator {
    font-size: 1.2em;
    font-weight: bold;
    text-shadow: none;
    color: #666;
}

/* Mastermode Display */
.mastermode-display {
    font-size: 1.1em;
    font-weight: bold;
}
.mastermode-open { color: #81e17b; }
.mastermode-veto { color: #ffe066; }
.mastermode-locked { color: #a01b1b; }
.mastermode-private { color: #e94d4d; }
.mastermode-password { color: #ff9600; }
.mastermode-unknown { color: #9e9e9e; }

/* Version Display */
.version-display-stacked {
    font-size: 0.9em;
    color: #666;
    line-height: 1.2;
    margin-top: 3px;
    text-align: center;
    cursor: help;
}
.version-white-strong {
    font-size: 1.1em !important;
    color: #fff;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
    display: block;
    margin-top: 2px;
}
.version-outdated {
  color: #9e9e9e !important;
  text-shadow: none !important;
}
.unsupported-version-pulse-stacked {
    color: #FF9800;
    font-weight: bold; 
    font-size: 0.9em;
    animation: pulseOrange 1.2s infinite cubic-bezier(.4,0,.6,1); 
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); 
}

/* Pulse animations */
.full-pulse {
    color: #D32F2F;
    font-weight: bold;
    animation: pulseRed 1.2s infinite cubic-bezier(.4,0,.6,1);
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}
@keyframes pulseRed {
    0% { opacity: 1; }
    50% { opacity: 0.35; }
    100% { opacity: 1; }
}
@keyframes pulseOrange {
  0% { opacity: 1; }
  50% { opacity: 0.35; }
  100% { opacity: 1; }
}
@keyframes pulseYellow {
  0% { opacity: 1; }
  50% { opacity: 0.35; }
  100% { opacity: 1; }
}
@keyframes pulseGreen {
  0% { opacity: 1; }
  50% { opacity: 0.35; }
  100% { opacity: 1; }
}
@keyframes pulseWhite {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}

.development-version-pulse-stacked {
  color: #FFEB3B;
  font-weight: bold;
  font-size: 0.9em;
  animation: pulseYellow 1.2s infinite cubic-bezier(.4,0,.6,1);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}

/* --- Map Cell Styling --- */
.map-cell {
    position: relative;
    padding: 10px; 
    height: 150px; 
    background-size: cover !important;
    overflow: hidden;
    min-width: 263px;
    width: 273px;
    box-sizing: border-box;
}

/* Always blur and darken background on hover for map-cell */
.map-cell:hover .map-cell-bg-wrapper {
    filter: blur(2px) brightness(0.7);
}

/* Overlays for full, outdated, and development servers */
.map-cell-full-overlay,
.map-cell-outdated-overlay,
.map-cell-development-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s ease;
}
.map-cell-full-overlay .full-content,
.map-cell-outdated-overlay .outdated-content,
.map-cell-development-overlay .development-content {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0,0,0,0.55);
  padding: 8px 12px;
  border-radius: 8px;
  max-width: 100%;
  overflow: hidden;
  min-width: 0;
}
.map-cell-full-overlay .full-label {
  color: #D32F2F;
  font-weight: bold;
  font-size: 1.6em;
  animation: pulseRed 1.2s infinite cubic-bezier(.4,0,.6,1);
  text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
}
.map-cell-outdated-overlay .outdated-label {
  color: #FF9800;
  font-weight: bold;
  font-size: 1.4em;
  animation: pulseOrange 1.2s infinite cubic-bezier(.4,0,.6,1);
  text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
}
.map-cell-development-overlay .development-label {
  color: #FFEB3B; /* yellow */
  font-weight: bold;
  font-size: clamp(0.95em, 1.8vw, 1.4em);
  line-height: 1.1;
  animation: pulseYellow 1.2s infinite cubic-bezier(.4,0,.6,1);
  text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

/* Show overlays on hover */
.map-cell.is-full:hover .map-cell-full-overlay,
.map-cell.is-full .map-title-overlay:hover ~ .map-cell-full-overlay,
.map-cell.is-outdated:hover .map-cell-outdated-overlay,
.map-cell.is-outdated .map-title-overlay:hover ~ .map-cell-outdated-overlay,
.map-cell.is-development:hover .map-cell-development-overlay,
.map-cell.is-development .map-title-overlay:hover ~ .map-cell-development-overlay {
  opacity: 1;
}

/* Show not-allowed cursor when hovering non-connectable states */
.map-cell.is-full:hover,
.map-cell.is-outdated:hover,
.map-cell.is-development:hover {
  cursor: not-allowed;
}

/* Ensure overlays also present not-allowed cursor when visible */
.map-cell.is-full:hover .map-cell-full-overlay,
.map-cell.is-full .map-title-overlay:hover ~ .map-cell-full-overlay,
.map-cell.is-outdated:hover .map-cell-outdated-overlay,
.map-cell.is-outdated .map-title-overlay:hover ~ .map-cell-outdated-overlay,
.map-cell.is-development:hover .map-cell-development-overlay,
.map-cell.is-development .map-title-overlay:hover ~ .map-cell-development-overlay {
  cursor: not-allowed;
}

/* Connect overlay for non-full, non-outdated servers */
.map-cell-connect-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15;
  pointer-events: auto;
  opacity: 0;
  transition: opacity 0.25s ease;
  text-decoration: none;
}
.map-cell-connect-overlay .connect-content {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #000;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}
.map-cell-connect-overlay .connect-label {
  color: #4CAF50;
  font-weight: bold;
  font-size: 1.4em;
  animation: pulseGreen 1.2s infinite cubic-bezier(.4,0,.6,1);
  text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
}
.map-cell:hover .map-cell-connect-overlay {
  opacity: 1;
}

/* Map background wrapper */
.map-cell-bg-wrapper {
    transition: filter 0.25s ease;
    width: 100% !important;
    height: 100% !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
}

/* Text container (Mastermode) */
.map-cell-content {
    color: white; 
    text-shadow: 0 0 4px #000, 0 0 2px #000; 
    position: relative; 
    z-index: 12;
    font-size: 0.8em; 
}

/* Server name title */
.server-name-title {
    font-size: 1.18em;
    font-weight: 700;
    line-height: 1.2;
    margin: 0 0 2px 0;
    cursor: help;
    overflow-wrap: anywhere;
    word-break: break-word;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

/* Map title overlay */
.map-title-overlay {
    position: absolute;
    bottom: 5px;
    right: 5px;
    margin: 0;
    padding: 6px 8px;
    font-size: 1.0em;
    color: white;
    border-radius: 3px;
    z-index: 13;
    line-height: 1;
    text-shadow: 1px 1px 6px #d32f2f, 0 0 2px #d32f2f;
    text-decoration: none;
    max-width: calc(100% - 10px);   /* keep within map cell width */

    /* Two-line clamp with progressive enhancement */
    display: -webkit-box;           /* enable flex-like box for clamp */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;          /* clamp to 2 lines (WebKit/Blink) */
    line-clamp: 2;                  /* progressive enhancement */
    overflow: hidden;               /* hide overflow */
    text-overflow: ellipsis;        /* show ellipsis when clipped */
    white-space: normal;            /* allow wrapping */
    word-break: break-word;         /* break long tokens if needed */

    /* Fallback for browsers without line-clamp support */
    max-height: 3.1em;              /* ~2 lines at line-height 1.2 (inline style) */
}

/* Map connect dialog */
.map-connect-dialog {
    position: absolute;
    bottom: 105%;
    right: 0;
    background: rgba(0,0,0,0.85);
    color: #fff;
    padding: 8px 12px;
    border-radius: 5px;
    font-size: 1em;
    width: 220px;
    box-shadow: 0 0 8px rgba(211,47,47,0.9);
    text-align: center;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transition: visibility 0s linear 0.2s, opacity 0.2s ease-in-out;
    z-index: 14;
}

/* Show dialog when .show class is added */
.map-connect-dialog.show {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
    transition-delay: 0s;
}

/* Direct connect link */
.map-link-direct {
    display: inline-block;
    margin-top: 6px;
    background: #d32f2f;
    color: #fff;
    padding: 6px 12px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    box-shadow: 0 0 5px #d32f2f;
    transition: background-color 0.3s ease;
}
.map-link-direct:hover,
.map-link-direct:focus {
    background-color: #a02727;
    outline: none;
}

/* Fallback map icon centering */
.bg2-question-center {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
  pointer-events: none;
}
.bg2-question-icon {
  height: 2em;
  filter: drop-shadow(0 0 4px #000);
}

/* Responsive adjustments combined */
@media (max-width: 900px) {
    .map-cell {
        min-width: 220px;
        height: 130px;
        padding: 8px;
        width: 220px;
    }
    .players-count-cell {
        width: 25px;
    }
    .server-details-cell {
        min-width: 220px;
        width: auto;
        word-break: break-word;
        overflow-wrap: anywhere;
        white-space: nowrap;
        overflow-x: auto;
    }
    .active-players-cell {
        min-width: 280px;
        width: auto;
        overflow-x: auto;
        white-space: nowrap;
    }
    #server-list td ul li strong.player-name {
        white-space: nowrap;
        overflow: visible;
        text-overflow: initial;
        display: inline-block;
        vertical-align: middle;
    }
}
@media (max-width: 700px) {
    .map-cell {
        min-width: 200px;
        height: 95px;
        padding: 4px;
        width: 200px;
    }
    .players-count-cell {
        width: 18px;
        font-size: 0.98em;
    }
    .server-details-cell {
        min-width: 170px;
    }
}
@media (max-width: 570px) {
    .map-cell {
        min-width: 190px;
        height: 70px;
        padding: 2px;
        width: 190px;
    }
    .players-count-cell {
        width: 13px;
        font-size: 0.95em;
    }
    .server-details-cell {
        min-width: 140px;
    }
}
@media (max-width: 500px) {
    .map-title-overlay {
        font-size: 1.05em;
        padding: 3px 4px;
    }
    .map-cell {
        min-width: 150px;
        height: 90px;
        padding: 1px;
        width: 150px;
    }
    .players-count-cell {
        width: 17px;
        padding-left: 2px;
        padding-right: 2px;
        font-size: 0.98em;
    }
    .server-details-cell {
        min-width: 130px;
    }
}
@media (max-width: 360px) {
    .map-title-overlay {
        font-size: 0.92em;
        padding: 2px 3px;
    }
    .map-cell {
        min-width: 12px;
        height: 62px;
        padding: 2px;
        width: 12px;
    }
    .players-count-cell {
        width: 10px;
        font-size: 0.92em;
    }
    .server-details-cell {
        min-width: 110px;
    }
}

/* Server details cell */
.server-details-cell {
    min-width: 350px;
    width: auto;
    word-break: break-word;
    overflow-wrap: anywhere;
    white-space: nowrap;
    overflow-x: auto;
}

/* Server location styling */
.server-location {
    position: static;
    cursor: help;
    margin-top: 0px;
    margin-bottom: 1px;
    color: #fff;
}
.server-location > span.location-hover-help {
    font-weight: bold;
    color: #fff;
    font-size: 1.0em;
    cursor: help;
    display: inline-flex;
    align-items: center;
}

/* Game mode line */
.gamemode-line-row {
    font-size: 1.0em; 
    font-weight: bold;
    line-height: 1.2;
    color: #fff;
    margin-top: 3px;
    margin-bottom: 2px;
    cursor: help;
}
.gamemode-line-row span {
    font-weight: bold;
    text-shadow: none;
    cursor: help;
}

/* Mutators display container */
.mutators-display-container {
    color: #fff;
    font-weight: bold;
    font-size: 1em;
    margin-top: 0;
    margin-bottom: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 3px 10px;
}
.mutators-display-container span.mutator-hover-help {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: bold;
    cursor: help;
}

/* Time left container */
.time-left-container {
    font-weight: bold;
    cursor: help;
    line-height: 1.2;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis;
    color: #fff;
    font-size: 1em;
    margin-top: 3px;
    margin-bottom: 2px;
    display: block;
}
.time-left-container.waiting { cursor: help !important; }
.time-left-container img {
    margin-right: 5px;
    vertical-align: middle;
}

/* Remove text-shadow from server details contents */
.server-details-cell strong,
.server-details-cell span,
.server-details-cell div,
.server-details-cell img,
.server-details-cell a {
    text-shadow: none !important;
}

/* Player list */
#server-list td ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
#server-list td ul li {
    line-height: 1.4;
    white-space: nowrap; 
}

/* Player name styling */
#server-list td ul li strong.player-name {
    display: inline-block;
    white-space: nowrap;
    overflow: visible;
    text-overflow: initial;
    vertical-align: middle;
    text-shadow: none !important;
    color: #FF1000;
}
#server-list td ul li strong.player-name[title^="Player"]:hover {
    color: var(--hover-color, #00C853) !important;
}

/* Team columns in active players cell */
.team-columns {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
}
.team-column {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
    width: max-content;
    min-width: 0;
    flex: 0 0 auto;
}
.team-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    margin-right: 6px;
}
.team-header .team-icon {
    height: 1.4em;
    vertical-align: middle;
    filter: drop-shadow(0 0 2px #000);
    cursor: help;
}
.team-header-text {
    font-weight: bold;
    color: #fff;
    text-align: center;
    margin-bottom: 6px;
}

/* Active players cell styling */
.active-players-cell {
    min-width: 280px;
    width: auto;
    overflow-x: auto;
    white-space: nowrap;
}

/* Scrollbar for active players cell */
.active-players-cell::-webkit-scrollbar {
    height: 8px;
    background: #222;
}
.active-players-cell::-webkit-scrollbar-thumb {
    background: #ff2222;
    border-radius: 6px;
    border: 2px solid #111;
}
.active-players-cell::-webkit-scrollbar-thumb:hover {
    background: #ff4444;
}
.active-players-cell::-webkit-scrollbar-corner {
    background: #222;
}
/* Firefox */
.active-players-cell {
    scrollbar-color: #ff2222 #222;
    scrollbar-width: thin;
}

/* No players pulse effect */
.no-players-pulse {
  color: #fff;
  font-weight: bold;
  cursor: help !important;
  animation: pulseWhite 1.2s infinite cubic-bezier(.4,0,.6,1);
  text-shadow: 0 0 10px #222;
}

/* Mastermode strong text inherits player name style */
.mastermode-display strong {
    font-weight: bold;
    text-shadow: none;
}

/* Cursor help for various hover elements */
.map-title-overlay[title],
.gamemode-line-row span.gamemode-hover-help,
.gamemode-hover-help,
.mutators-display-container[title],
.time-left-container[title]:not(.waiting),
.version-display-stacked[title],
.server-location[title],
.player-privilege-help[title],
.player-name {
    cursor: help !important;
}

/* Cursor help for settings tooltips and version badges */
.settings-dropdown .settings-item[title],
.settings-dropdown .settings-subitem-caption[title],
.unsupported-version-pulse-stacked[title],
.development-version-pulse-stacked[title] {
    cursor: help !important;
}

/* Keep normal pointer cursor on the text of Legacy connect and Less notifications */
.settings-dropdown #opt-legacy-connect + span,
.settings-dropdown #opt-less-notifications + span {
    cursor: help !important;
}

/* Last checked time group */
.last-checked-group {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}
.last-checked-group, .last-checked-group img, #last-checked-time {
    font-size: 1.0em;
    color: #999;
    font-weight: bold;
    text-shadow: none;
    cursor: help !important;
}

/* Location hover help */
.location-hover-help {
    font-weight: bold;
    color: #fff;
    font-size: 1.0em;
    cursor: help;
    text-shadow: none;
    display: inline-flex;
    align-items: center;
}

/* Map connect dialog arrow */
.map-connect-dialog::before {
    content: '';
    position: absolute;
    bottom: -8px;
    right: 12px;
    border-width: 8px 8px 0 8px;
    border-style: solid;
    border-color: rgba(0,0,0,0.85) transparent transparent transparent;
    display: block;
    width: 0;
    z-index: 14;
}

/* Responsive dialog for small screens */
@media (max-width: 400px) {
    .map-connect-dialog {
        width: 90vw;
        left: 50%;
        right: auto;
        transform: translateX(-50%);
        bottom: 110%;
        font-size: 0.9em;
        padding: 6px 10px;
    }
    .map-connect-dialog::before {
        right: 50%;
        left: auto;
        transform: translateX(50%);
    }
}

/* Make privilege SVG icons color via CSS filter (default neutral; overridden inline per player) */
.player-privilege-help {
    filter: none;
}

/* Basic switch styling for notification-control if not present elsewhere */
.notification-control .switch { position: relative; display: inline-block; width: 46px; height: 24px; }
.notification-control .switch input { opacity: 0; width: 0; height: 0; }
.notification-control .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #555; transition: .2s; border-radius: 24px; }
.notification-control .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .2s; border-radius: 50%; }
.notification-control input:checked + .slider { background-color: #4CAF50; }
.notification-control input:focus + .slider { box-shadow: 0 0 1px #4CAF50; }
.notification-control input:checked + .slider:before { transform: translateX(22px); }

/* Compact inline toggle in header */
.server-settings-button .notification-control.compact { display: inline-flex; align-items: center; margin-left: 6px; }
.notification-control.compact .switch { width: 34px; height: 18px; }
.notification-control.compact .slider:before { height: 12px; width: 12px; left: 3px; bottom: 3px; }
.notification-control.compact input:checked + .slider:before { transform: translateX(16px); }

/* New style for notifications label to match Settings text styling */
.notifications-label {
    font-size: 1em; /* match Settings text size */
    font-weight: 600; /* similar visual weight to button label */
    color: #fff; /* match Settings text color */
    user-select: none;
}

/* Notifications box styling to match Settings button and red toggle */
.notifications-box .switch input { opacity: 0; width: 0; height: 0; }
.notifications-box { cursor: help; }
.notifications-box .switch { cursor: pointer; }
.notifications-box .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #555; transition: .2s; border-radius: 24px; }
.notifications-box .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .2s; border-radius: 50%; }
.notifications-box input:checked + .slider { background-color: #920504; }
.notifications-box input:focus + .slider { box-shadow: 0 0 1px #920504; }
.notifications-box input:checked + .slider:before { transform: translateX(22px); }
.notifications-box .slider.round { border-radius: 24px; }
.notifications-box .slider.round:before { border-radius: 50%; }

/* Glow effect for notifications toggle on hover/focus */
.notifications-box .switch:hover .slider,
.notifications-box .switch:focus-within .slider {
  box-shadow: 0 0 8px rgba(255, 64, 64, 0.7), 0 0 16px rgba(255, 64, 64, 0.5);
}
.notifications-box .switch:hover input:checked + .slider,
.notifications-box .switch:focus-within input:checked + .slider {
  background-color: #c20a09; /* brighter red when on */
}
.notifications-box .switch:hover .slider:before,
.notifications-box .switch:focus-within .slider:before {
  box-shadow: 0 0 6px rgba(255, 64, 64, 0.6);
}

/* Equalize header control heights (Notifications box and Settings button) */
.server-header-line .notifications-box,
.server-header-line #server-settings-button {
  min-height: 38px;          /* minimum baseline; grows with text */
  box-sizing: border-box;    /* include padding and border in set height */
  display: inline-flex;      /* ensure both behave the same */
  align-items: center;       /* vertically center contents */
  white-space: nowrap;       /* prevent wrapping from changing height */
}

/* Center the Notifications toggle vertically, remove extra margins, and push it to the right */
  .notifications-box label.switch {
    margin: 0 0 0 auto; /* push toggle to the right inside the pill */
    align-self: center;
}

/* Ensure Notifications label has no red text glow */
  .notifications-box label span {
    text-shadow: none !important;
  }

/* Responsive label for 'Notifications' and 'Settings' */
.header-responsive-label {
    font-size: clamp(0.9rem, 1.4vw, 1.05rem);
    font-weight: 600;
    line-height: 1;
}

/* Center 'Notifications' and 'Settings' labels on small screens */
@media (max-width: 700px) {
  .server-header-line .notifications-box > label:not(.switch) {
    flex: 1 1 auto;
    justify-content: center;
    text-align: center;
  }
  .server-header-line #server-settings-button {
    justify-content: center;
  }
}

/* Settings button hover glow */
#server-settings-button {
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}
#server-settings-button:hover,
#server-settings-button:focus-visible {
  background-color: #c20a09 !important; /* brighter red on hover */
  box-shadow: 0 0 8px rgba(255, 64, 64, 0.7), 0 0 16px rgba(255, 64, 64, 0.5) !important; /* red glow */
  border-color: #ff6b6b;
}

/* Use context-menu cursor on hover for Settings button */
#server-settings-button:hover { cursor: context-menu !important; }

/* Keep hover/glow while dropdown is open */
#server-settings-button[aria-expanded="true"] {
  background-color: #c20a09 !important; /* same brighter red */
  box-shadow: 0 0 8px rgba(255, 64, 64, 0.7), 0 0 16px rgba(255, 64, 64, 0.5) !important; /* same red glow */
  border-color: #ff6b6b;
}

/* Settings dropdown styles */
.settings-menu-container { position: relative; }
.settings-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  background: #111;
  color: #fff;
  border: 1px solid #cccccc;
  border-radius: 8px;
  padding: 8px 10px;
  min-width: 220px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.4);
  z-index: 1000;
  display: none;
}
.settings-dropdown.show { display: block; }
.settings-dropdown .settings-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 6px;
  font-size: 0.95em;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
}
/* Changed line as per instruction: */
.settings-dropdown input[type="checkbox"] { width: 16px; height: 16px; accent-color: #920504; cursor: pointer; }
.settings-dropdown, .settings-dropdown * { text-shadow: none !important; }

/* Sub-item (slider) shown under Less notifications */
.settings-dropdown .settings-subitem {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 4px;
  padding: 2px 6px 6px 28px; /* indent under checkbox */
}
.settings-dropdown .settings-subitem-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.settings-dropdown .settings-subitem input[type="range"] {
  flex: 1 1 120px;
  min-width: 120px;
  accent-color: #920504;
}
.settings-dropdown .settings-subitem input[type="range"]:hover { cursor: ew-resize; }
.settings-dropdown .settings-subitem input[type="range"]::-webkit-slider-thumb { cursor: ew-resize; }
.settings-dropdown .settings-subitem input[type="range"]::-moz-range-thumb { cursor: ew-resize; }
.settings-dropdown .settings-subitem input[type="range"]::-ms-thumb { cursor: ew-resize; }

/* Glow on hover/focus for Less notifications slider thumb */
#opt-less-notifications-threshold::-webkit-slider-thumb { transition: box-shadow 0.2s ease; }
#opt-less-notifications-threshold:hover::-webkit-slider-thumb,
#opt-less-notifications-threshold:focus-visible::-webkit-slider-thumb,
#opt-less-notifications-threshold:focus::-webkit-slider-thumb {
  box-shadow: 0 0 8px rgba(255, 64, 64, 0.7), 0 0 16px rgba(255, 64, 64, 0.5);
}
#opt-less-notifications-threshold::-moz-range-thumb { transition: box-shadow 0.2s ease; }
#opt-less-notifications-threshold:hover::-moz-range-thumb,
#opt-less-notifications-threshold:focus-visible::-moz-range-thumb,
#opt-less-notifications-threshold:focus::-moz-range-thumb {
  box-shadow: 0 0 8px rgba(255, 64, 64, 0.7), 0 0 16px rgba(255, 64, 64, 0.5);
}
#opt-less-notifications-threshold::-ms-thumb { transition: box-shadow 0.2s ease; }
#opt-less-notifications-threshold:hover::-ms-thumb,
#opt-less-notifications-threshold:focus-visible::-ms-thumb,
#opt-less-notifications-threshold:focus::-ms-thumb {
  box-shadow: 0 0 8px rgba(255, 64, 64, 0.7), 0 0 16px rgba(255, 64, 64, 0.5);
}

/* Sub-item-value styling */
.settings-dropdown .settings-subitem-value {
  width: 2ch;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.settings-dropdown .settings-subitem-caption {
  font-size: 0.92em;
  font-weight: 600;
  line-height: 1.2;
  opacity: 0.9;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
</style>

<script>
/*
  Update the tooltip to reflect the client's local time relative to the server's local time.
  Exposed as a global so we can re-run it after in-place updates.
*/
function __updateLastCheckedTooltip() {
  // Client browser time zone difference with server local time, enhance tooltip dynamically.
  var lastChecked = document.getElementById('last-checked-time');
  if (!lastChecked || !lastChecked.parentElement) return;
  var parent = lastChecked.parentElement;
  if (!parent.title || !parent.title.includes('Server browser Local-Time')) return;
  var titleBase = 'Last checked, Server browser Local-Time ';
  var serverTimeMatch = parent.title.match(/Server browser Local-Time ([^\(]+)/);
  if (serverTimeMatch && serverTimeMatch[1]) {
    var serverLocal = serverTimeMatch[1].trim();
    var parts = serverLocal.split(/\D+/);
    if (parts.length >= 6) {
      var serverDate = new Date(parts[2], parseInt(parts[1],10)-1, parts[0], parts[3], parts[4], parts[5]);
      var clientDate = new Date();
      var offsetHours = Math.round((clientDate.getTime() - serverDate.getTime()) / (1000*60*60));
      var sign = offsetHours > 0 ? '-' : (offsetHours < 0 ? '+' : '');
      var absDiff = Math.abs(offsetHours);
      var pad = function(n){ return n.toString().padStart(2, '0'); };
      var userTime = pad(clientDate.getHours())+":"+pad(clientDate.getMinutes())+":"+pad(clientDate.getSeconds());
      var tooltip = titleBase + serverLocal + '\n(Your Local-Time ' + userTime;
      if (absDiff >= 1) {
        tooltip += ' ' + sign + absDiff + 'h';
      }
      tooltip += ')';
      parent.title = tooltip;
    }
  }
}
document.addEventListener('DOMContentLoaded', __updateLastCheckedTooltip);
</script>

<script>
(function(){
  var btn = document.getElementById('server-settings-button');
  var dropdown = document.getElementById('settings-dropdown');
  var container = document.querySelector('.settings-menu-container');
  var hoverCloseTimer = null;

  function closeMenu(){
    dropdown.classList.remove('show');
    dropdown.setAttribute('aria-hidden','true');
    btn.setAttribute('aria-expanded','false');
  }
  function openMenu(){
    dropdown.classList.add('show');
    dropdown.setAttribute('aria-hidden','false');
    btn.setAttribute('aria-expanded','true');
  }
  function toggleMenu(e){
    e.stopPropagation();
    var showing = !dropdown.classList.contains('show');
    if (showing) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  btn.addEventListener('click', toggleMenu);
  dropdown.addEventListener('click', function(e){ e.stopPropagation(); });
  document.addEventListener('click', function(){ closeMenu(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeMenu(); });

  if (container) {
    container.addEventListener('mouseenter', function(){
      if (hoverCloseTimer) { clearTimeout(hoverCloseTimer); hoverCloseTimer = null; }
      openMenu();
    });
    container.addEventListener('mouseleave', function(){
      if (hoverCloseTimer) clearTimeout(hoverCloseTimer);
      hoverCloseTimer = setTimeout(closeMenu, 200);
    });
    dropdown.addEventListener('mouseenter', function(){
      if (hoverCloseTimer) { clearTimeout(hoverCloseTimer); hoverCloseTimer = null; }
    });
    dropdown.addEventListener('mouseleave', function(){
      if (hoverCloseTimer) clearTimeout(hoverCloseTimer);
      hoverCloseTimer = setTimeout(closeMenu, 200);
    });
  }

  // Cookie helpers
  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days*24*60*60*1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/; SameSite=Lax';
  }
  function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i=0; i<ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
    }
    return null;
  }

  // Global function to apply legacy/steam hrefs to connect links
  window.__applyLegacyConnect = function() {
    var legacyEnabled = document.documentElement.classList.contains('legacy-connect-enabled');
    // Overlay connect links
    var overlayLinks = document.querySelectorAll('a.map-cell-connect-overlay');
    overlayLinks.forEach(function(a){
      var legacyHref = a.getAttribute('data-legacy-href');
      var steamHref = a.getAttribute('data-steam-href') || 'steam://run/967460';
      if (legacyEnabled && legacyHref) {
        a.setAttribute('href', legacyHref);
      } else {
        a.setAttribute('href', steamHref);
      }
    });
    // Title connect links
    var titleLinks = document.querySelectorAll('a.map-title-connect-link');
    titleLinks.forEach(function(a){
      var legacyHref = a.getAttribute('data-legacy-href');
      var steamHref = a.getAttribute('data-steam-href') || 'steam://run/967460';
      if (legacyEnabled && legacyHref) {
        a.setAttribute('href', legacyHref);
      } else {
        a.setAttribute('href', steamHref);
      }
    });
  };

  // Persist options and expose flags via root classes
  var legacy = document.getElementById('opt-legacy-connect');
  var less = document.getElementById('opt-less-notifications');
  if (!legacy || !less) return;
  var LEGACY_KEY = 'legacy-connect';
  var LESS_KEY = 'less-notifications';
  var LEGACY_COOKIE = 're_opt_legacy_connect';

  var lessSliderWrap = document.getElementById('less-notifications-slider');
  var lessSlider = document.getElementById('opt-less-notifications-threshold');
  var lessSliderValue = document.getElementById('opt-less-notifications-threshold-value');
  var LESS_THRESH_KEY = 're:opt:less-notifications-threshold';

  try {
    // Cookie first for legacy, then localStorage fallback
    var cv = getCookie(LEGACY_COOKIE);
    if (cv !== null) {
      legacy.checked = cv === '1';
    } else {
      var lv = localStorage.getItem(LEGACY_KEY);
      if (lv !== null) legacy.checked = lv === '1';
    }
    var ln = localStorage.getItem(LESS_KEY);
    if (ln !== null) less.checked = ln === '1';
  } catch (e) {}

  try {
    var lt = localStorage.getItem(LESS_THRESH_KEY);
    if (lt !== null && lessSlider) {
      var num = parseInt(lt, 10);
      if (!isNaN(num) && num >= 1 && num <= 10) {
        lessSlider.value = String(num);
      }
    }
  } catch (e) {}
  if (lessSliderValue && lessSlider) {
    lessSliderValue.textContent = String(lessSlider.value);
  }

  function updateFlags() {
    document.documentElement.classList.toggle('legacy-connect-enabled', !!legacy.checked);
    document.documentElement.classList.toggle('less-notifications-enabled', !!less.checked);
    // Show/hide slider under Less notifications
    if (lessSliderWrap) {
      lessSliderWrap.style.display = less.checked ? 'flex' : 'none';
    }
    // Expose threshold as a data attribute for potential styling/logic
    if (less.checked && lessSlider) {
      document.documentElement.dataset.lessNotificationsThreshold = String(lessSlider.value);
    } else {
      delete document.documentElement.dataset.lessNotificationsThreshold;
    }
    if (typeof window.__applyLegacyConnect === 'function') window.__applyLegacyConnect();
  }
  updateFlags();

  legacy.addEventListener('change', function(){
    try {
      localStorage.setItem(LEGACY_KEY, legacy.checked ? '1' : '0');
      setCookie(LEGACY_COOKIE, legacy.checked ? '1' : '0', 365);
    } catch (e) {}
    updateFlags();
  });
  less.addEventListener('change', function(){
    try { localStorage.setItem(LESS_KEY, less.checked ? '1' : '0'); } catch (e) {}
    updateFlags();
  });

  if (lessSlider && lessSliderValue) {
    lessSlider.addEventListener('input', function(){
      lessSliderValue.textContent = String(lessSlider.value);
    });
    lessSlider.addEventListener('change', function(){
      try { localStorage.setItem(LESS_THRESH_KEY, String(lessSlider.value)); } catch (e) {}
      updateFlags();
    });
  }

  // Defensive: apply once more after DOMContentLoaded in case elements render later
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ if (window.__applyLegacyConnect) window.__applyLegacyConnect(); });
  } else {
    if (window.__applyLegacyConnect) window.__applyLegacyConnect();
  }
})();
</script>

<script>
(function(){
  var checkbox = document.getElementById('notif-toggle');
  var container = document.querySelector('.notifications-box');
  var switchLabel = document.querySelector('.notifications-box .switch');
  var textLabel = document.querySelector('.notifications-box > label[for="notif-toggle"]');
  if (!checkbox || !container) return;
  function updateTitle() {
    var text = 'Turn notifications ' + (checkbox.checked ? 'off' : 'on');
    container.setAttribute('title', text);
    if (switchLabel) switchLabel.setAttribute('title', text);
    if (textLabel) textLabel.setAttribute('title', text);
  }
  // Initialize and update on change
  updateTitle();
  checkbox.addEventListener('change', updateTitle);
})();
</script>

<script>
/*
  Show full map name on hover when the two-line clamp truncates it.
  Runs on load, resize, and after soft refresh via window.__applyMapTitleTooltips.
*/
(function(){
  function isClamped(el) {
    // Detect vertical or horizontal clipping beyond client box (allow small rounding)
    return (el.scrollHeight - el.clientHeight) > 1 || (el.scrollWidth - el.clientWidth) > 1;
  }

  function apply() {
    var titles = document.querySelectorAll('.map-title-overlay');
    titles.forEach(function(el){
      // Clear any previous title
      el.removeAttribute('title');

      var text = (el.textContent || '').trim();
      if (!text) return;

      var clamped = isClamped(el);
      if (clamped) {
        // Add tooltip to the title itself
        el.setAttribute('title', text);
        // Mirror tooltip to the connect overlay (which may cover the title on active servers)
        var cell = el.closest('.map-cell');
        if (cell) {
          var overlay = cell.querySelector('a.map-cell-connect-overlay');
          if (overlay) {
            overlay.setAttribute('title', text);
          }
        }
      } else {
        // Remove mirrored tooltip if present
        var cell2 = el.closest('.map-cell');
        if (cell2) {
          var overlay2 = cell2.querySelector('a.map-cell-connect-overlay[title]');
          if (overlay2) overlay2.removeAttribute('title');
        }
      }
    });
  }

  // Expose globally so soft refresh can call it
  window.__applyMapTitleTooltips = apply;

  // Re-apply on resize (debounced)
  function debounce(fn, wait) {
    var t; return function(){ clearTimeout(t); t = setTimeout(fn, wait); };
  }
  window.addEventListener('resize', debounce(apply, 150));
  // Initial run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
</script>
