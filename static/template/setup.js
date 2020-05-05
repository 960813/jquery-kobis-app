const movieItem = `
<div class="movieItems__movieItem" data-id="{{movieCd}}"> 
    <div class="movieItem__grid"> 
        <div class="movieItem__thumb"> 
            <img src="{{imgsrc}}" alt=""> 
        </div> 
    </div> 
</div>
`;


const movieDetail = `
<div class="movieDetail__content">
    <div id="closeBtn">
        <img src="static/images/close.svg">
    </div>
    <a href="{{naverMovieSrc}}" target="_blank">
        <img src="{{imgsrc}}"> 
    </a>    
    <div class="detail__box movieDetail__info"> 
            <div class="detail__box">
                <span class="detail__title">제목</span>
                <div class="detail__text"> 
                    {{movieNm}} 
                    {{#movieNmEn}} 
                        ({{movieNmEn}}) 
                    {{/movieNmEn}} 
                </div>                
            </div> 
            <div class="detail__box">
                <span class="detail__title">상영시간</span>
                  <div class="detail__text"> 
                    {{showTm}}분
                </div>                
            </div> 
            <div class="detail__box">
                <span class="detail__title">개봉연도</span>
                <div class="detail__text"> 
                    {{openDt}}
                </div>
            </div> 
            <div class="detail__box detail__nations"> 
                <span class="detail__title">제작국가</span>
                {{#nations}} 
                    <div class="detail__text nations__nation"> 
                        <span>{{nation.nationNm}}</span> 
                    </div> 
                {{/nations}} 
            </div> 
            <div class="detail__box detail__genres">
                <span class="detail__title">장르</span>
                {{#genres}} 
                    <div class="detail__text genres__genre"> 
                        <span>{{genre.genreNm}}</span> 
                    </div> 
                {{/genres}} 
            </div> 
            <div class="detail__box detail__directors"> 
                <span class="detail__title">감독</span>
                {{#directors}} 
                    <span class="detail__text directors__director"> 
                        {{director.peopleNm}}
                        {{#director.peopleNmEn}} 
                            ({{director.peopleNmEn}}) 
                        {{/director.peopleNmEn}} 
                    </span> 
                {{/directors}} 
            </div>
            <div class="detail__box detail__directors"> 
                <span class="detail__title">
                    <a href="{{naverMovieSrc}}" target="_blank">더보기(네이버영화)<i></i></a>                    
                </span>
            </div> 
    </div> 
</div>
`;