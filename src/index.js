import React, { Component } from 'react';
import jsonp from 'jsonp';
import qs from 'qs';

class SoundCloudEmbed extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        __html: null
      };
  
      this.fetchEmbed = this.fetchEmbed.bind(this);
      this.getQueryParams = this.getQueryParams.bind(this);
      this.handleFetchSuccess = this.handleFetchSuccess.bind(this);
      this.handleFetchFailure = this.handleFetchFailure.bind(this);
    }
  
    componentDidMount() {
      const fetchParams = this.getQueryParams(this.props);
      this.fetchEmbed(fetchParams);
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      const { url } = this.props;
      const { __html } = this.state;
      if (nextProps.url !== url ||
          nextState.__html !== __html) {
        return true;
      }
      return false;
    }
  
  
    fetchEmbed(queryParams) {
      const payload = new Promise((resolve, reject) => {
        jsonp(`https://soundcloud.com/oembed?${queryParams}`, null, (err, data) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(data);
          }
        });
      });
  
      payload.then(this.handleFetchSuccess).catch(this.handleFetchFailure);
    }
  
    getQueryParams({ url, height, width }) {
      return qs.stringify({
        url,
        format: 'js',
        maxheight: height,
        maxwidth: width
      });
    }
  
    handleFetchSuccess(response) {
      this.setState({ __html: response.html });
    }
  
    handleFetchFailure() {
      this.setState({ __html: null });
    }
  
    render() {
      return <div dangerouslySetInnerHTML={{ __html: this.state.__html }} />;
    }
}

export default SoundCloudEmbed;