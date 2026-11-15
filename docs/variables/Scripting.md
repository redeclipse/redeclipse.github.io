---
title: Variables - Scripting
layout: docs
origfile: variables/Scripting.md
origtitle: Scripting
permalink: /docs/variables/Scripting
redirect_from:
  - /wiki/variables/Scripting/
---
* TOC
{:toc}
Binding keys, aliases, and the CubeScript commands that scripts are made of.

## Binds

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `kmod` | takes up to three modifiers (CTRL, ALT, SHIFT) and returns a key modifier mask for use with editbind and geteditbind | `modifer, modifier, modifier` |
| `bind` | binds an action to a key. WARNING: This overrides existing binds for that key;<br>key is a key, for example KP1 or RETURN,<br>action is a command to be executed when the key is pressed,<br>example: bind O [echo O was pressed .. ; onrelease [echo .. and released]] | `key action` |
| `editbind` | binds an edit mode action to a key. WARNING: This overrides existing edit binds for that key;<br>key is a key, for example KP1 or RETURN,<br>action is a command to be executed when the key is pressed in edit mode. | `key action kmod` |
| `specbind` | binds a spectator mode action to a key. WARNING: This overrides existing spectator binds for that key;<br>key is a key, for example KP1 or RETURN,<br>action is a command to be executed when the key is pressed in spectator mode. | `key action` |
| `getbind` | returns the command associated with a given key bind;<br>key is a key, for example KP1 or RETURN. | `key` |
| `geteditbind` | returns the command associated with a given key bind for edit mode;<br>key is a key, for example KP1 or RETURN. | `key kmod` |
| `getspecbind` | returns the command associated with a given key bind for spectator mode;<br>key is a key, for example KP1 or RETURN. | `key` |
| `searchbinds` | finds key binds for a given action;<br>this is used by the dobindsearch alias | `action [formatting options]` |
| `searcheditbinds` | finds edit key binds for a given action;<br>this is used by the dobindsearch alias | `action [formatting options]` |
| `searchspecbinds` | finds spectator key binds for a given action;<br>this is used by the dobindsearch alias | `action [formatting options]` |
| `dobindsearch` | prints out a nicely formatted string with the key binds for a given action;<br>action is the action to search for,<br>[mode] can be edit or spec to search for the corresponding mode specific binds. | `key [mode]` |

## Aliases and input

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `echo` | prints the argument to the console | `input` |
| `echocolour` | prints the argument to the console with the specified colour | `colour input` |
| `setpersist` | toggles an alias as persistent, that is, determines if it will be added to config.cfg;<br>bool: 0 = not persistent, 1 = persistent | `alias bool` |
| `local` | declares a set of aliases as local to the alias (function) it was declared in | - |
| `alias` | defines a new alias (variable or command block);<br>example: alias pi 3.14159265359<br>is equivalent to: pi = 3.14159265359 | `name contents` |
| `getalias` | looks up the contents of an alias;<br>example: echo (getalias dm)<br>is equivalent to: echo $dm | `name` |
| `inputconsole` | prepares input to the command line;<br>[init] is the input string<br>[prompt] is an optional prompt to use next to the input<br>[action] is an optional command to execute after inputconsole | `[init] [prompt] [action]` |
| `setcomplete` | Enables (or disables) tab-completion of a command;<br>name is the name of a command or alias,<br>[bool] (1) enables completion of name (the dafault is 0, disabled). | `name [bool]` |
| `listcomplete` | Enables tab-completion of a command's first argument;<br>name is a command or alias,<br>list is a list of valid arguments to be completed | `name list` |
| `playercomplete` | Enables tab-completion for players as argument of a command;<br>name is a command or alias,<br>remove can be omitted to add a completion or set to >0 to remove the completion | `name remove` |
| `complete` | Enables tab-completion for files as argument of a command;<br>name is a command or alias,<br>[path] is a directory to look for the files, note the path is not contained in the auto-completed argument,<br>extension allows to pick only a certain file type, and will omit the extension when completing file names.<br>example: complete filecomp config cfg | `name [path] [extension]` |
| `defvarp` | defines a persistent integer alias | `alias-name min default max exec-on-change` |
| `deffvarp` | defines a persistent float alias | `alias-name min default max exec-on-change` |
| `defhvarp` | defines a persistent hexadecimal alias (note that inputs are decimal) | `alias-name min default max exec-on-change` |
| `defsvarp` | defines a persistent string alias | `alias-name default exec-on-change` |
| `defvar` | defines a non-persistent integer alias | `alias-name min default max exec-on-change` |
| `deffvar` | defines a non-persistent float alias | `alias-name default exec-on-change` |
| `defhvar` | defines a non-persistent hexadecimal alias (note that inputs are decimal) | `alias-name min default max exec-on-change` |
| `defsvar` | defines a non-persistent string alias | `alias-name default exec-on-change` |
| `getvarmin` | returns the minimum value of varname, a built-in integer variable;<br>example: getvarmin firstpersonfov | `varname` |
| `getvarmax` | returns the maximum value of varname, a built-in integer variable;<br>example: getvarmax firstpersonfov | `varname` |
| `getfvarmin` | returns the minimum value of varname, a built-in float variable;<br>example: getfvarmin movespeed | `varname` |
| `getfvarmax` | returns the maximum value of varname, a built-in float variable;<br>example: getfvarmax movespeed | `varname` |
| `isonline` | returns 1 if you are online and 0 if not | - |

## Loops

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `loop` | executes body with var incremented from 0 to count-1;<br>example: loop i 10 [ echo $i ] | `var count body` |
| `loop+` | executes body with var incremented from 0 to count-1, shifted by the offset given | `var offset count body` |
| `loop*` | executes body with var incremented from 0 to (count-1)*step, in increments of the defined step | `var step count body` |
| `loop+*` | executes body with var decremented from 0 to (count-1)*step, in increments of the defined step, and shifted by the offset given | `var offset step count body` |
| `looprev` | executes body with var decremented from 0 to count-1;<br>example: loop i 10 [ echo $i ] | `var count body` |
| `looprev+` | executes body with var decremented from 0 to count-1, shifted by the offset given | `var offset count body` |
| `looprev*` | executes body with var decremented from 0 to (count-1)*step, in increments of the defined step | `var step count body` |
| `looprev+*` | executes body with var decremented from 0 to (count-1)*step, in increments of the defined step, and shifted by the offset given | `var offset step count body` |
| `loopwhile` | executes body with var incremented from 0 to count-1 while the provided condition is true;<br>example: loop i 10 [ echo $i ] | `var count body` |
| `loopwhile+` | executes body with var incremented from 0 to count-1, shifted by the offset given, while the provided condition is true | `var offset count body` |
| `loopwhile*` | executes body with var incremented from 0 to (count-1)*step, in increments of the defined step, while the provided condition is true, while the provided condition is true | `var step count body` |
| `loopwhile+*` | executes body with var decremented from 0 to (count-1)*step, in increments of the defined step, and shifted by the offset given | `var offset step count body` |
| `loopwhilerev` | executes body with var decremented from 0 to count-1 while the provided condition is true;<br>example: loop i 10 [ echo $i ] | `var count body` |
| `loopwhilerev+` | executes body with var decremented from 0 to count-1, shifted by the offset given, while the provided condition is true | `var offset count body` |
| `loopwhilerev*` | executes body with var decremented from 0 to (count-1)*step, in increments of the defined step, while the provided condition is true | `var step count body` |
| `loopwhilerev+*` | executes body with var decremented from 0 to (count-1)*step, in increments of the defined step, and shifted by the offset given, while the provided condition is true | `var offset step count body` |
| `loopconcat` | returns a string with the result of the body concatenated with var incremented from 0 to count-1;<br>example: loopconcat i 10 [ result $i ] | `var count body` |
| `loopconcatword` | returns a string with the result of the body concatword-ed with var incremented from 0 to count-1;<br>example: loopconcatword i 10 [ result $i ] | `var count body` |
| `loopfiles` | executes body with var set to each file in directory with the given extension ("" for extension is all files);<br>example: loopfiles f data cfg [ echo $f ] | `var directory extension body` |
| `looplist` | executes body with var set to each item in list;<br>example: looplist i "this is a list" [ echo $i ] | `var list body` |
| `loopscoreboard` | executes body with var set to players' cn in order of their points within a given scoregroup number (team alpha/omega/neutral/spec etc.) | `var scoregroup body` |
| `loopscoregroups` | executes body with var set to scoregroup numbers in order (0,1,2..) | `var, body` |
| `looplistconcat` | executes body with var set to each entry in list and concats the output together into a list | `var list command` |
| `looplistconcatword` | executes body with var set to each entry in list and concats the output together into a string without spaces | `var list command` |
| `while` | executes body while cond is true;<br>example: i = 0; while [  $i 10 ] [ echo $i; i = (\| $i 1) ] | `<cond> body` |

## Lists

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `indexof` | returns the index in list of data;<br>example: indexof "this is a list" list | `list data` |
| `listdel` | returns the list1 with all occurrences of each element in list2 removed, it is equivalent to set difference;<br>example: listdel "this list has duplicates" "this duplicates", will return "list has" | `list1 list2` |
| `listintersect` | returns a list containing the elements in the order of list1 with only the elements common to both list1 and list2 | `list1, list1` |
| `listunion` | returns a list containing the elements of list1 followed by nonduplicate elements of list2 | `list1 list2` |
| `listfind` | returns the index in list where the body returns true, similar to looplist;<br>example: listfind i "this is a list" [ result (= (strstr $i l) 0) ] | `var list body` |
| `listlen` | returns the length of the list;<br>example: listlen "this is a list" | `list` |
| `listsplice` | returns a list where the elements between the start index and the end or for count elements is replaced with value;<br>example: listsplice "1 2 3 4 5 6" insert 2 3 | `list value start count` |
| `prettylist` | returns a recombined list with a comma placed between each list element and conjunctor placed between the last two elements (in addition to the comma);<br>example: prettylist "1 2 3 4" and | `list conjunctor` |
| `shrinklist` | returns a list of all element that exists in both list1 and list2;<br>if there are no results and failover is 1 or 2, the list that failover points to is returned,<br>without failover, shrinklist is equivalent to set symmetric difference;<br>example: shrinklist "this is a list" "this is another list", will return "this is list" | `list1 list2 [failover]` |
| `sublist` | returns a sublist of list starting at start and ending at the end or for count elements;<br>example: sublist "this is a list" 1 2 | `list start [count]` |
| `sortlist` | returns a sorted list (quicksort) based on the result of body applied onto list;<br>if body returns true the two elements varname_1 and varname_2 will be swapped, unchanged otherwise,<br>example: sortlist "cat ape bear boar" a b [s $a $b], will return "ape bear boar cat" (&lt;s is ascii-alphabetic comparison) | `<list varname_1 varname_2 body` |
| `at` | returns the element at index in list, subsequent indexes are at'd with the previous result;<br>example: at [this has a [nested list]] 3 1 | `list index [nested_index..]` |
| `strstr` | returns the index of search in string;<br>example: strstr "long string" "str" | `string search` |
| `substr` | returns a substr of string starting at start and continuing to the end or for count characters;<br>example: substr "string" 2 3 | `string start [count]` |

## Conditionals

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `do` | executes body;<br>example: do [ echo hi ] | `body` |
| `case` | executes the first body where the corresponding test_value is equivalent to integer using integer comparison;<br>for the 'default' case (always true), use () for the test_value, has a limit of 12 conditions,<br>example: case (rnd 3) 0 [ echo 0 ] 1 [ echo 1 ] () [ echo default ] | `integer [test_value body] [test_value body] [..]` |
| `casef` | executes the first body where the corresponding test_value is equivalent to float using float comparison;<br>for the 'default' case (always true) use () for the test_value, has a limit of 12 conditions,<br>example: case (+f (rnd 3) .1) 0.1 [ echo 0.1 ] 1.1 [ echo 1.1 ] () [ echo default ] | `float [test_value body] [test_value body] [..]` |
| `cases` | executes the first body where the corresponding test_value is equivalent to string using string comparison;<br>for the 'default' case (always true) use () for the test_value, has a limit of 12 conditions,<br>example: case (substr "abc" (rnd 3) 1) a [ echo a ] b [ echo b ] () [ echo default ] | `string [test_value body] [test_value body] [..]` |
| `caseif` | executes a list of conditions and body counterparts, stops evaluating if condition is met;<br>example: caseif (=s $var1 moo) [echo moo] (= $var2 woof) [echo woof] () [echo null] | `condition1 body1 condition2 body2 ..` |
| `cond` | executes the first body where the corresponding condition is true, has a limit of 12 conditions;<br>example: i = (rnd 3); cond [ = $i 0 ] [ echo 0 ] [ = $i 1 ] [ echo 1 ] 1 [ echo default ] | `[condition body] [condition body] [..]` |
| `if` | execute true_body when condition is true, otherwise executes false_body;<br>example: if (&lt;= $var 5) [ echo less than or equal to 5 ] [ echo greater than 5 ] | `condition true_body false_body` |
| `result` | sets the return value for the currently executing code to value, note that this does not stop the code execution like return would;<br>example: result 1 | `value` |
| `doif` | executes a list of conditions and body counterparts, continues evaluating even if condition is met;<br>example: doif (=s $var1 moo) [echo moo] (= $var2 woof) [echo woof] () [echo null] | `condition1 body1 condition2 body2 ..` |
| `push` | pushes value into var's stack and executes body then pops value off of var so that var is untouched after execution of body;<br>example: var = 5; push var 10 [ echo $var ]; echo $var | `var value body` |
| `sleep` | executes body after waiting milliseconds of game time, which stops while paused and follows gamespeed;<br>with real set, waits real time instead and keeps running while paused;<br>example: sleep 2000 [ echo waited 2 seconds ] | `milliseconds body [real]` |

## Multary operators

Multary operators take an arbitrary number of arguments and return a single value.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `max` | returns the maximum integer value;<br>example: max 1 3 -9 | `integer..` |
| `maxf` | returns the maximum float value;<br>example: maxf 1.1, 2.9, -9.5 | `float..` |
| `min` | returns the minimum integer value;<br>example: min 1 3 -9 | `integer..` |
| `minf` | returns the minimum float value;<br>example: minf 1.1, 2.9, -9.5 | `float..` |
| `listavg` | returns the aritmetic mean of the values in the list as an integer | `values` |
| `listavgf` | returns the aritmetic mean of the values in the list as a float | `values` |
| `*` | returns all arguments multiplied together as integers | `int..` |
| `*f` | returns all arguments multiplied together as floats | `float..` |
| `+` | returns all arguments added together as integers | `int..` |
| `+f` | returns all arguments added together as floats | `float..` |
| `-` | returns all other arguments subtracted from the first argument as integers | `int..` |
| `-f` | returns all other arguments subtracted from the first argument as floats | `float..` |
| `div` | returns all other arguments divided from the first argument as integers | `int..` |
| `divf` | returns all other arguments divided from the first argument as floats | `float..` |

## Binary operators

Binary operators take two arguments and return a single value (this is not the same as binary logic).

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `mod` | returns the modulus of int1 and int2 (that is, the remainder of int1/int2) | `int1 int2` |
| `modf` | returns the modulus of float1 and float2 (that is, the remainder of float1/float2) | `float1 float2` |
| `pow` | returns base raised to the power of exponent;<br>example: pow 2.1 8.1 | `base exponent` |
| `rnd` | returns a random number between 0 or min and max;<br>example: rnd 50 25 | `max [min]` |
| `round` | returns the float given rounded to the nearest integer to to the nearest N if N is passed | `value, N` |
| `precf` | returns the value float truncated to accuracy number of decimals;<br>example: (precf 0.14986 2) will give 0.14 | `float accuracy` |
| `&` | returns the bit-wise AND of int1 and int2 | `int1 int2` |
| `&~` | returns the bit-wise NOT of the bit-wise AND of int1 and int2 | `int1 int2` |
| `<<` | returns int1 left shifted int2 times | `int1 int2` |
| `>>` | returns int1 right shifted int2 times | `int1 int2` |
| `^` | returns the bit-wise XOR of int1 and int2 | `int1 int2` |
| `^~` | returns the bit-wise NOT of the bit-wise XOR of int1 and int2 | `int1 int2` |
| `\|` | returns the bit-wise OR of int1 and int2 | `int1 int2` |
| `\|~` | returns the bit-wise NOT of the bit-wise OR of int1 and int2 | `int1 int2` |
| `~` | returns the bit-wise NOT of int | `int` |

## Unary operators

Unary operators take a single argument and return a single value.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `cos` | returns the cosine of float;<br>example: cos 3.1415 | `float` |
| `sin` | returns the sine of float;<br>example: sin 3.1415 | `float` |
| `tan` | returns the tangent of float;<br>example: tan 3.1415 | `float` |
| `acos` | returns the arc-cosine of float;<br>example: acos 1 | `float` |
| `asin` | returns the arc-sine of float;<br>example: asin 1 | `float` |
| `atan` | returns the arc-tangent of float;<br>example: atan 1 | `float` |
| `abs` | returns the absolute value of integer;<br>example: abs -5 | `integer` |
| `absf` | returns the absolute value of float;<br>example: absf -8.5 | `float` |
| `exp` | returns e (2.71828) raised to the float power;<br>example: exp 5.6 | `float` |
| `sqrt` | returns the square root of float;<br>example: sqrt 4 | `float` |
| `log10` | return the logarithm of float with base 10;<br>example: log10 1000 | `float` |
| `log2` | return the logarithm of float with base 2;<br>example: log2 8 | `float` |
| `loge` | return the logarithm of float with base e;<br>example: loge 20.08 | `float` |
| `ceil` | returns the smallest integer larger than the given float | `float` |
| `ceilf` | returns the smallest integer larger than the given float as a float (e.g. ceilf 5.5 -> 6.0) | `float` |
| `floor` | returns the largest integer smaller than the given float | `float` |
| `floorf` | returns the largest integer smaller than the given float as a float (e.g. floorf 5.5 -> 5.0) | `float` |
| `toint` | returns the int representation of the given float; works like `floor` in practice | `float` |
| `bitscan` | returns value of smallest bit in binary representation of number<br>25 -> 0 (2^0)<br>32 -> 5 (2^5) 6 -> 1 (2^1) | `int` |
| `strlen` | returns the length of string;<br>example: strlen "four" | `string` |
| `rndstr` | returns random characters with a length given by the argument | `length` |

## Boolean operators

Boolean operators output true (`1`) or false (`0`), unlike the arithmetic/bitwise operators above.

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `!` | returns the logical not of condition | `condition` |
| `&&` | returns the logical and of all given conditions | `condition..` |
| `?` | returns true_body when condition is true, otherwise false_body | `condition true_body false_body` |
| `\|\|` | returns the logical or of all given conditions | `condition..` |
| `!=` | returns true when int1 is not equal to int2 | `int1 int2` |
| `!=f` | returns true when float1 is not equal to float2 | `float1 float2` |
| `!=s` | returns true when string1 is not equal to string2 on the ascii table | `string1 string2` |
| `<=` | returns true when int1 is less than or equal to int2 | `int1 int2` |
| `<=f` | returns true when float1 is less than or equal to float2 | `float1 float2` |
| `<=s` | returns true when string1 is less than or equal to string2 on the ascii table | `string1 string2` |
| `<` | returns true when int1 is less than int2 | `int1 int2` |
| `<f` | returns true when float1 is less than float2 | `float1 float2` |
| `<s` | returns true when string1 is less than string2 on the ascii table | `string1 string2` |
| `=` | returns true when int1 is equal to int2 | `int1 int2` |
| `=f` | returns true when float1 is equal to float2 | `float1 float2` |
| `=s` | returns true when string1 is equal to string2 on the ascii table | `string1 string2` |
| `>=` | returns true when int1 is greater than or equal to int2 | `int1 int2` |
| `>=f` | returns true when float1 is greater than or equal to float2 | `float1 float2` |
| `>=s` | returns true when string1 is greater than or equal to string2 on the ascii table | `string1 string2` |
| `>` | returns true when int1 is greater than int2 | `int1 int2` |
| `>f` | returns true when float1 is greater than float2 | `float1 float2` |
| `>s` | returns true when string1 is greater than string2 on the ascii table | `string1 string2` |
| `~=s` | returns true when string1 is equal to string2 ignoring case;<br>example: ~=s "str" "StR" | `string1 string2` |
| `!~=s` | returns true when string1 is not equal to string2 ignoring case | `string1 string2` |
| `<~s` | returns true when string1 is less than string2 ignoring case | `string1 string2` |
| `>~s` | returns true when string1 is greater than string2 ignoring case | `string1 string2` |
| `<~=s` | returns true when string1 is less than or equal to string2 ignoring case | `string1 string2` |
| `>~=s` | returns true when string1 is greater than or equal to string2 ignoring case | `string1 string2` |
| `~=sn` | returns true when the first count characters of string1 and string2 are equal ignoring case;<br>example: ~=sn "str" "StRiNg" 3 | `string1 string2 count` |
| `=sn` | returns true when the first count characters of string1 and string2 are equal;<br>example: =sn "str" "string" 3 | `string1 string2 count` |
| `!=sn` | returns true when the first count characters of string1 and string2 are not equal | `string1 string2 count` |
| `<sn` | returns true when the first count characters of string1 are less than those of string2 | `string1 string2 count` |
| `>sn` | returns true when the first count characters of string1 are greater than those of string2 | `string1 string2 count` |
| `<=sn` | returns true when the first count characters of string1 are less than or equal to those of string2 | `string1 string2 count` |
| `>=sn` | returns true when the first count characters of string1 are greater than or equal to those of string2 | `string1 string2 count` |
| `!~=sn` | returns true when the first count characters of string1 and string2 are not equal ignoring case | `string1 string2 count` |
| `<~sn` | returns true when the first count characters of string1 are less than those of string2 ignoring case | `string1 string2 count` |
| `>~sn` | returns true when the first count characters of string1 are greater than those of string2 ignoring case | `string1 string2 count` |
| `<~=sn` | returns true when the first count characters of string1 are less than or equal to those of string2 ignoring case | `string1 string2 count` |
| `>~=sn` | returns true when the first count characters of string1 are greater than or equal to those of string2 ignoring case | `string1 string2 count` |
| `strcasecmp` | returns true when string1 is equal to string2 ignoring case;<br>example: strcasecmp "str" "StR" | `string1 string2` |
| `strcmp` | returns true when string1 is equal to string2, equivalent to =s;<br>example: strcmp "str" "str" | `string1 string2` |
| `strncasecmp` | returns true when the first count characters of string1 and string2 are equal ignoring case;<br>example: strncasecmp "str" "StRiNg" 3 | `string1 string2 count` |
| `strncmp` | returns true when the first count characters of string1 and string2 are equal;<br>example: strncmp "str" "string" 3 | `string1 string2 count` |

## Formatting

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `escape` | returns a quoted string with all newline, tab, form feed, ^, and " characters converted to the cubescript escape sequence (^n, ^t, ^f, ^^, ^");<br>example: escape [line1^nline2] | `text` |
| `unescape` | returns a string with all cubescript escape sequences (^n, ^t, ^f, ^^, ^") converted back into newline, tab, form feed, ^, and " respectively;<br>example: unescape [line1^^nline2] | `text` |
| `stripcolors` | returns the string without any colors;<br>example: stripcolors "^frhello ^f[6252287]" | `string` |
| `hexcolour` | converts a decimal color value to a "pretty-printed" hexadecimal color value;<br>example: (hexcolour 342344) will give 0x093548 | `color` |
| `tohex` | converts a decimal integer to one in a hexadecimal base, with the provided length (tohex N 6 is equivalent to hexcolour) | `value, length` |
| `concat` | returns all values concatenated with a space between each argument;<br>example: concat hello (getname) | `value..` |
| `concatword` | returns all values concatenated without a space between each argument;<br>example: concatword squished string | `value..` |
| `clearsleep` | removes all pending sleeps, if clearmapdefs is set, it will only clear sleeps generated in a map's config file;<br>example: clearsleep | `[clearmapdefs]` |
| `format` | returns a formatted string with all %1 - %9 replaced with the respective value argument, %% inserts a % sign;<br>example: format "Hello, %1, welcome to Red Eclipse v. %2" (getname) $version | `format_string value..` |
| `filter` | filters a string by stripping of any or all of the following: newlines, color, and whitespace, each of these values are boolean, and true by default if omitted;<br>[newlines] - if true, replaces newline characters with spaces,<br>[color] - if true, any color formatting will be removed,<br>[whitespace] - if true, whitespace is kept; if false, whitespace is removed | `string [newlines] [color] [whitespace]` |
| `strreplace` | returns string with all occurrences of search replaced with replace;<br>example: strreplace "misspelled sring" "sring" "string" | `string search replace` |
| `strupper` | returns the input string in all uppercase;<br>example: strupper "String" -> "STRING" | - |
| `strlower` | returns the input string in all lowercase;<br>example: strupper "String" -> "string" | - |

## Config files

| Variable / Command | Description | Arguments / Fields |
| :--- | :--- | :--- |
| `writevars` | writes the current server's variables to a config file named file;<br>if [all] is true, every variable will be written with default values commented out; if false, only changed variables will be written (default: false)<br>if [sv_] is true, variables will be prefixed with "sv_" (default: false) | `file [all] [sv_]` |
| `writevarsinfo` | writes raw information about all existing vars, commands and aliases to a file;<br>for each item the following fields are printed: NAME TYPE FLAGS ARGS VALTYPE VALUE MIN MAX DESC USAGE,<br>fields are separated by tabs, and empty if nonexistent | `file` |
| `writecfg` | saves your settings to config.cfg, or the settings read at the start to init.cfg if init is 1; the game does this when it quits | `[init]` |
| `exec` | runs the CubeScript in a file, returning 1 if it could be read; msg 1 reports a file that can't be read | `file [flags] [msg]` |
| `execute` | runs a string as CubeScript and returns its result | `code` |
