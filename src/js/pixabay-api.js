import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchPhotos = (searchedQuery, page) => {
  const axiosOptions = {
    params: {
      key: '45714704-c3295be315f324c1eb86e3dfd',
      q: searchedQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: page,
    },
  };

  return axios.get('', axiosOptions);
};
