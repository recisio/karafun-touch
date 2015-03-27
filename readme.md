# KaraFun Touch

![KaraFun Touch](https://github.com/karafun/touch/blob/master/i/img/gh_illus.png?raw=true)
--

**KaraFun Touch** is an Open Source Touchscreen interface control for **KaraFun Player**, the karaoke player designed for Windows ([http://www.karafun.com](http://www.karafun.com)).

## Installation

KaraFun Touch has been designed as a Chrome App. In order to install it, go to your extensions in Google Chrome and add the folder where KaraFun Touch files are stored.

##General information

Volume values are between 0 (muted) and 100 (full volume)  
Time and duration values are in seconds (can be float)  
Color are in HTML format #RRGGBB

##List of actions

### Get player status

    <action type="getStatus" [noqueue]></action>

Reflect the current state of KaraFun Player. `no queue` allows not to send the queue status.

---
Response to getStatus

    <status state="{player_state}">
        [<position>{time_in_seconds}</position>]
        <volumeList>
            <general caption="{caption}">{volume}</general>
            [<bv caption="{caption}">{volume}</bv>]
            [<lead1 caption="{caption}" color="{color}">{volume}</lead1>]
            [<lead2 caption="{caption}" color="{color}">{volume}</lead2>]
        </volumeList>
        <pitch>{pitch}</pitch>
        <tempo>{tempo}</tempo>
        <queue>
                <item id="{queue_position}" status="{item_state}">
                        <title>{song_name}</title>
                        <artist>{artist_name}</artist>
                        <year>{year}</year>
                        <duration>{duration_in_seconds}</duration>
                        [<singer>{singer_name}</singer>]
               </item>
                ...
        </queue>
    </status>

`<volumeList>` general is always included, disabled volumes are not included  
`<queue>` item count is limited to 100 (approx 5 hours of queue!)  
`player_state` possible values :

* idle
* infoscreen
* loading
* playing

`item_state` possible values :

* ready
* loading


### Audio control and transport
    
    <action type="play"></action>
    <action type="pause"></action>
    <action type="next"></action>
    <action type="seek">{time_in_seconds}</action>
    <action type="pitch">{picth}</action>
    <action type="tempo">{tempo}</action>

### Volume management

    <action type="setVolume" type="{volume_type}">{volume_between_0_100}</action>
`volume_type` possible values are from the getStatus

### Song queue management
    
    <action type="clearQueue"></action>
    <action type="addToQueue" song="{song_id}">{add_position}</action>
    <action type="removeFromQueue" id="{queue_position}"></action>
    <action type="changeQueuePosition" id="{old_position}">{new_position}</action>

`song_id` and `queue_id` are unique  
`position` possible values :

* 0: top
* 1...n: specific position
* 99999: bottom

### Get the list of catalogs

    <action type="getCatalogList"></action>

List currently available catalogs. Queue, history and tree structure are not included.

`type` possible values :

* onlineComplete
* onlineNews
* onlineFavorites
* onlineStyle
* localPlaylist
* localDirectory

---
Response to getCatalogList

    <catalogList>
        <catalog id="{unique_id}" type="{type}">{caption}</item>
        <catalog id="{unique_id}" type="{type}">{caption}</item>
        ...
    </catalogList>

### Get a list content

    <action type="getList" id="{list_id}" offset="{offset}" limit="{limit}"></action>

List the songs of a catalog  
Default `limit` is 100

### Search

    <action type="search" offset="{offset}" limit="{limit}">{search_string}</action>

List the songs of a search 
Default `limit` is 100

---
Response to getList/search

    <list total={total}>
        <item id="{unique_id}">
            <title>{song_name}</title>
            <artist>{artist_name}</artist>
            <year>{year}</year>
            <duration>{duration_in_seconds}</duration>
        </item>
        ...
    </list>

### Screen Management

	<action type="screenPosition" x="{x}" y="{y}" width="{width}" height="{height}"></action>

Set the screen position

	<action type="fullscreen"></action>

Set the second screen into fullscreen mode