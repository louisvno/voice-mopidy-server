const Promise = require('bluebird')
const sqlite = require('sqlite')
const path = require('path')
const dbPromise = sqlite.open(path.resolve('database.sqlite'), { Promise });

exports.getMediaList = async ()=>{
    const db = await dbPromise;
    const mediaList= await db.all('SELECT id,resourceId FROM media');
    return mediaList;
}

exports.addMedia = async (resourceId)=>{
    const db = await dbPromise;
    await db.run('INSERT INTO media(id,resourceId) VALUES(?,?)',null, resourceId);
    const mediaList = await this.getMediaList();
    return mediaList;
}
