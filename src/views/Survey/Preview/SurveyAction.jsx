import { style, script } from './style';

const $ = require('jquery');

export function preview(formData){
    let formRenderOpts = {
        dataType: 'json',
        formData: formData
    };
    let renderContainer = $('<div>');
    renderContainer.formRender(formRenderOpts);
    let left = (($(window).width()) / 2.2) - (480 / 2);
    let top = (($(window).height() / 2) / 3);

    let html = `<!doctype html>
    <title>Survey Tokopedia</title>
    <head>
        <script src="cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E=" crossorigin="anonymous"></script>
        <script src="https://formbuilder.online/assets/js/form-builder.min.js"></script>   
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="crossorigin="anonymous"></script>
        <link rel = "stylesheet" type= "text/css href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css">             
        <script>`+ script + `</script>
        <style>`+ style + `</style>
    </head>
    <body class="container"><h1 style="text-align:center; color:#000">Preview</h1><hr>${renderContainer.html()}</body>
    </html>`;

    var formPreviewWindow = window.open('', 'formPreview', 'height=480,width=640,left =' + left + ',top=' + top + ', toolbar=no,scrollbars=yes');

    formPreviewWindow.document.write(html)
    formPreviewWindow.document.close();
    formPreviewWindow.focus();
}