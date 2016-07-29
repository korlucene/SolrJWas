/**
 * 
 */


// 현재페이지, 총페이지수, 한페이지에 보여줄 행, URL
function get_paging(write_pages, cur_page, total_page, url)
{
    str = "";
    if (cur_page > 1) {
        str += "<a href='" + url + "1'>처음</a>";
    }

    start_page = ( ( (int)( (cur_page - 1 ) / write_pages ) ) * write_pages ) + 1;
    end_page = start_page + write_pages - 1;

    if (end_page >= total_page) end_page = total_page;

    if (start_page > 1) str += " &nbsp;<a href='" + url + (start_page-1) + "'>이전</a>";

    if (total_page > 1) {
        for (var k=start_page; k<=end_page; k++) {
            if (cur_page != k)
                str += " &nbsp;<a href='" + url + k +"'><span>" + k + "</span></a>";
            else
                str += " &nbsp;<b>" + k "</b> ";
        }
    }

    if (total_page > end_page) str += " &nbsp;<a href='" + url + (end_page+1)  + "'>다음</a>";

    if (cur_page < total_page) {
        str += " &nbsp;<a href='" + url + total_page + "'>맨끝</a>";
    }
    str += "";

    return str;
}

