const searchPeopleList = (callback) => {
    $('#app > #loading').css({display: 'flex'});
    $('tbody').empty();

    let cnt = 0;
    const deferreds = new Array(50);
    for (let page = 1; page <= 5; page++) {
        const jqxhr = $.ajax({
            url: 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.xml' +
                `?key=${serviceKey}` +
                `&curPage=${page}`,
            type: 'get',
            dataType: 'xml'
        }).then((data) => {
            $(data).find('people').each((idx, target) => {
                const peopleNm = $(target).find('peopleNm').text();
                const repRoleNm = $(target).find('repRoleNm').text();
                const filmoNames = $(target).find('filmoNames').text();

                $('tbody').append(`
                <tr>
                    <td>${peopleNm}</td>
                    <td>${repRoleNm}</td>
                    <td>${filmoNames}</td>
                </tr>
                `);
                $('#loading > span').text((++cnt) + '/' + '50');
            });
        }, (err) => {
            console.log(err);
        });
        deferreds.push(jqxhr);
    }

    $.when.apply(this, deferreds).done(() => {
        $('#loading > span').empty();
        // last-callback
        if (callback) callback();
    });
};

const fetchCallback = () => {
    $('#app > #loading').css({display: 'none'});
};

$(window).on('load', () => {
    searchPeopleList(fetchCallback);
});