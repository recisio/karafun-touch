#KaraFun Remote Control Documentation

List of actions that can be send to the Player : 

### volume

    <action type="volume">{{volume_between_0_100}}</action>
    <action type="leadvolume">{{volume_between_0_100}}</action>
    <action type="chorusvolume">{{volume_between_0_100}}</action>

### play
    
    <action type="play"></action>

### pause

    <action type="pause"></action>

### seek

    <action type="seek">{{time_in_second}}</action>


### getTree()

call

    <action type="gettree"></action>

response

    <tree>
        <treeElementName id="{{element_id}}"></treeElementName>
        <treeElementName id="{{element_id}}">
            <treeElementName id="{{element_id}}"></treeElementName>
            <treeElementName id="{{element_id}}"></treeElementName>
        </treeElementName>
        <treeElementName id="{{element_id}}"></treeElementName>
    </tree>

### getList(id)

call

    <action type="getlist">{{list_id}}</action>

response

    <list>
        <item>
            <song id="{{song_id}}">{{song_name}}</song>
            <artist id="{{artist_id}}">{{artist_name}}</artist>
        </item>
        <item>
            <song id="{{song_id}}">{{song_name}}</song>
            <artist id="{{artist_id}}">{{artist_name}}</artist>
        </item>
    </list>

### getStatus()

call

    <action type="getstatus"></action>

response

    <status>
        <playtime>{{time_in_seconds}}</playtime>
        <volumes>
            <general>{{volume_between_0_100}}</general>
            <lead>{{volume_between_0_100}}</lead>
            <chorus>{{volume_between_0_100}}</chorus>
        </volumes>
        <pitch>{{pitch}}</pitch>
        <tempo>{{tempo}}</tempo>
    </status>
