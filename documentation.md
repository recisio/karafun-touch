#KaraFun Remote Control Documentation

List of actions that can be send to the Player : 

### changeVolume(typeOfVolume,volume)
- typeOfVolume (string) : 'general', 'lead', 'cover'
- volume (int)

### play
### pause
### seek(time)
- time (int)

### getTree()

    <tree>
        <treeElementName id="1"></treeElementName>
        <treeElementName id="2">
            <treeElementName id="3"></treeElementName>
            <treeElementName id="10"></treeElementName>
        </treeElementName>
        <treeElementName id="5"></treeElementName>
    </tree>

### getList(id)
- id (int) : tree Element Id

Response

    <list>
    </list>

### getStatus()
