# Overview
A React component that uses [SoundCloud's oEmbed API](https://developers.soundcloud.com/docs/oembed) to render music on a webpage.

## How to install
```shell
npm i --save react-soundcloud-component
```

## How to include
```javascript
import SoundCloudEmbed from './SoundCloudEmbed';;
```

## How to use
```html
<SoundCloudEmbed url="https://soundcloud.com/octobersveryown/drake-passionfruit" height="300" width="300" />
```

This component accepts several props.

Props  | Description
------ | -----
url | soundcloud url for a track, playlist, user
height | height of embed object
width | width of embed object
