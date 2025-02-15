import '../css/styles.css';
import { fetchImages } from './pixabay-api';
import { renderGallery } from './render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
let query = '';

const form = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loaderWrapper = document.querySelector('.loader-wrapper');
let lightbox = new SimpleLightbox('.gallery a');

const toggleLoader = (show) => {
  if (show) {
    loaderWrapper.classList.remove('is-hidden');
  } else {
    loaderWrapper.classList.add('is-hidden');
  }
};

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();
  currentPage = 1;
  galleryContainer.innerHTML = '';

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
    });
    return;
  }

  try {
    toggleLoader(true);
    const data = await fetchImages(query, currentPage);

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    renderGallery(data.hits);
    lightbox.refresh();

    if (data.totalHits > currentPage * 40) {
      loadMoreBtn.classList.remove('is-hidden');
    } else {
      loadMoreBtn.classList.add('is-hidden');
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching images. Please try again later.',
    });
  } finally {
    toggleLoader(false);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  try {
    toggleLoader(true);
    const data = await fetchImages(query, currentPage);

    renderGallery(data.hits);
    lightbox.refresh();

    if (currentPage * 40 >= data.totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      iziToast.info({
        title: 'End of results',
        message: "You've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching more images.',
    });
  } finally {
    toggleLoader(false);
  }
});
