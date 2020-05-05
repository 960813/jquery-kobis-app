const getYeterdayDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return today;
};

const movieData = [];

const searchDailyBoxOfficeList = (callback) => {
    $('#app > #loading').css({display: 'flex'});
    $('.movieDetail').empty();
    $('.movieItems').empty();
    $.ajax({
        url: 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.xml' +
            `?key=${serviceKey}` +
            `&targetDt=${$('#dateCal').val().replace(/-/gi, '')}`,
        type: 'get',
        dataType: 'xml'
    }).then((data) => {
        const movieItemArray = new Array(10);
        const deferreds = new Array(10);

        let cnt = 0;
        $(data).find('dailyBoxOffice').each((idx, target) => {
            const movieCd = $(target).find('movieCd').text();

            const jqxhr = $.ajax({
                url: 'http://ync.jupiterflow.com/jquery/searchMovieInfo' +
                    `?key=${serviceKey}` +
                    `&movieCd=${movieCd}`,
                type: 'get',
                dataType: 'xml'
            }).then((data) => {
                const renderData = {
                    movieCd: movieCd,
                    movieNm: $(data).find('movieNm').text(),
                    movieNmEn: $(data).find('movieNmEn').text(),
                    showTm: $(data).find('showTm').text(),
                    openDt: $(data).find('openDt').text().replace(/(\d{4})(\d{2})(\d{2})/g, '$1년 $2월 $3일'),
                    nations: [],
                    genres: [],
                    directors: [],
                    imgsrc: $(data).find('imgSrc').text(),
                    naverMovieSrc: $(data).find('naverMovieSrc').text()
                };
                movieData.push({movie: renderData});
                $($(data).find('nation')).each((idx, target) => {
                    renderData.nations.push({
                        nation: {
                            nationNm: $(target).find('nationNm').text()
                        }
                    });
                });
                $($(data).find('genre')).each((idx, target) => {
                    renderData.genres.push({
                        genre: {
                            genreNm: $(target).find('genreNm').text()
                        }
                    });
                });
                $($(data).find('director')).each((idx, target) => {
                    renderData.directors.push({
                        director: {
                            peopleNm: $(target).find('peopleNm').text(),
                            peopleNmEn: $(target).find('peopleNmEn').text()
                        }
                    });
                });
                movieItemArray[idx] = Mustache.render(movieItem, renderData);
                $('#loading > span').text((++cnt) + '/' + '10');
            });
            deferreds.push(jqxhr);

        });

        $.when.apply(this, deferreds).done(() => {
            $('#loading > span').empty();
            movieItemArray.forEach((item, idx) => {
                $('.movieItems').append(item);
            });
            // last-callback
            if (callback) callback();
        });


    }, (err) => {
        console.log(err);
    });
};

const fetchCallback = () => {
    $('#app > #loading').css({display: 'none'});
    $('.movieItem__grid').on('click', (event) => {
        const target__movieItem = $(event.target).parents('.movieItems__movieItem');
        const movieCd = $(target__movieItem).data('id');

        for (let i = 0; i < movieData.length; i++) {
            if (movieData[i].movie.movieCd === movieCd.toString()) {
                $('.movieDetail').html(Mustache.render(movieDetail, movieData[i].movie));
                $('.movieDetail').css({display: 'block'});
                $('#closeBtn > img').on('click', (event) => {
                    $('.movieDetail').css({display: 'none'});
                });
                $(window).scrollTop(0);
                break;
            }
        }
    });
};

$(window).on('load', () => {
    document.getElementById('dateCal').valueAsDate = getYeterdayDate();
    $('#dateCal').on('change', (evt) => searchDailyBoxOfficeList(fetchCallback));

    searchDailyBoxOfficeList(fetchCallback);
});