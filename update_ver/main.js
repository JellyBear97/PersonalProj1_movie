document.addEventListener('DOMContentLoaded', function () {
  allMovieShow();
});

const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjdkNzRhNTRiYzEzNTE4ZDgyMTc1MjAzNzM4MzliNSIsInN1YiI6IjY0NzA4OGI1NTQzN2Y1MDE0NzVmMDU0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FaD0cXTgqDH5QUE4-ZoUBQJFr9fuQMr0VtpdOJEbTxE',
  },
};

// 모든 영화 listing 함수 정의 | page
let allMovieShow = function () {
  // 영화 API 요청 코드
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', OPTIONS)
    .then(response => response.json())
    .then(movieDummy => {
      console.log('this is movieDummy', movieDummy);

      all_movie_infos = movieDummy['results'];
      let temp_html = ``;
      all_movie_infos.forEach(movie => {
        let movie_id = movie['id'];
        let movie_title = movie['title'];
        let movie_image = 'https://image.tmdb.org/t/p/w500' + movie['poster_path'];
        let movie_overview = movie['overview'];
        let movie_rating = movie['vote_average'];

        temp_html += `<div class="card-bg">
                        <div class="card-content" onclick="showMovieId(${movie_id})">
                          <!-- 이미지 크기 260*390 -->
                          <img src="${movie_image}" alt="movie image" />
                          <h3 class="movie_title">${movie_title}</h3>
                          <p class="card-overview">${movie_overview}</p>
                          <p class="card-rating">rating ${movie_rating}</p>
                        </div>
                      </div>`;
      });

      document.getElementById('cards').innerHTML = temp_html;
    })
    .catch(err => console.error(err));
};

let showMovieId = function (movie_id) {
  alert(`movie id is "${movie_id}"`);
};

// 검색한 영화 listing 함수 정의
let searchedMovieShow = function (event) {
  event.preventDefault();

  // searchMovie_str : 검색 input 입력값
  let searchMovie_str = document.querySelector('#search-input').value;

  // 문자열 공백->빈값, 공백만 입력했을 경우 '문자 입력' alert 후 함수 빠져나가기
  let trim_searchMovie_str = searchMovie_str.split(' ').join('').toLowerCase();
  console.log(trim_searchMovie_str);
  if (trim_searchMovie_str === '') {
    alert('문자를 입력해주세요');
    return;
  } // ? else 꼭 안써도 되는 거인가요?

  // document에서 title 가져오기
  let movie_collection = document.querySelectorAll('.card-bg');
  console.log(movie_collection);

  // ? 아래 changed_movie_list 같은 변수는 안쓰는 거니까 굳이 할당문 안써줘도 되나요?
  let changed_movie_list = [...movie_collection].map(movie => {
    let movie_title_str = movie.querySelector('.movie_title').textContent;
    let compare_target = movie_title_str.split(' ').join('').toLowerCase();
    if (!compare_target.includes(trim_searchMovie_str)) {
      movie.classList.add('hide');
    } else {
      movie.classList.remove('hide');
    }
  });

  // movie랑 맞는 검색결과가 없을 경우 -> 페이지 새로고침
  // ! [주의] api로 받아오는 영화 자료가 20개라 가정하고 짠 코드임.
  if (document.querySelectorAll('.hide').length === 20) {
    alert('검색결과가 없습니다.');
    location.reload();
  }
};

// 검색한 영화 listing 함수 호출
document.querySelector('form').addEventListener('submit', searchedMovieShow);
