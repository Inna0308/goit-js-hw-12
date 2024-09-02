import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';

import { galleryTemplate } from './js/render-functions';
import { fetchPhotos } from './js/pixabay-api';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.js-loader');
const btnLoadMore = document.querySelector('.js-load-more');

const simpleLightbox = new SimpleLightbox('.js-gallery a', {
  overlayOpacity: 0.9,
  captions: true,
  captionsData: 'alt',
  captionDelay: 350,
});

let currentPage = 1;
let userValue = '';

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();

    userValue = searchFormEl.elements.user_query.value.trim();

    currentPage = 1;

    if (!userValue) {
      iziToast.warning({
        message: 'Input field must not be empty.',
        position: 'topRight',
      });
      return;
    }

    galleryEl.innerHTML = '';

    loader.classList.remove('is-hidden');

    const response = await fetchPhotos(userValue, currentPage);

    if (!response.data.hits.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      galleryEl.innerHTML = '';
      searchFormEl.reset();
      loader.classList.add('is-hidden');
      btnLoadMore.classList.add('is-hidden');

      return;
    }

    const galleryCardTemplate = response.data.hits
      .map(image => galleryTemplate(image))
      .join('');

    galleryEl.innerHTML = galleryCardTemplate;

    btnLoadMore.classList.remove('is-hidden');

    simpleLightbox.refresh();
    searchFormEl.reset();
  } catch (error) {
    iziToast.error({
      message: 'Try again.',
      position: 'topRight',
    });
  } finally {
    loader.classList.add('is-hidden');
  }
};

const onBtnLoadMoreClick = async event => {
  try {
    currentPage++;

    loader.classList.remove('is-hidden');

    const response = await fetchPhotos(userValue, currentPage);

    const galleryCardTemplate = response.data.hits
      .map(image => galleryTemplate(image))
      .join('');

    galleryEl.insertAdjacentHTML('beforeend', galleryCardTemplate);
    simpleLightbox.refresh();

    const { height: cardHeight } =
      galleryEl.firstElementChild.getBoundingClientRect();
    scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const totalPages = Math.ceil(response.data.totalHits / 15);
    if (currentPage >= totalPages) {
      btnLoadMore.classList.add('is-hidden');

      iziToast.warning({
        title: Note,
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'The end of search results.',
      position: 'topRight',
    });
  } finally {
    loader.classList.add('is-hidden');
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
btnLoadMore.addEventListener('click', onBtnLoadMoreClick);
