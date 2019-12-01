class Review {
    constructor(source, container, form){
        this.source = source;
        this.container = container;
        this.form = form;
        this.comments = []; // Все отзывы
        this.curID = 0;
        this._init(this.source);
    }
    _init(source){
        fetch(source)
            .then(result => result.json())
            .then(data => {
                this.curID = data.maxID;
                for (let comment of data.comments){
                    this.comments.push(comment);
                    this._renderComment(comment);
                }
                this._initForm();
            });
    }
    _initForm(){
        $(this.form).submit(e => {
            e.preventDefault();
            if (!$('.form-input-name').val() && !$('.form-textarea-review').val()){
                return
            }
            let comment = {
                id: ++this.curID,
                author: $('.form-input-name').val(),
                text: $('.form-textarea-review').val(),
                approved: false
            };
            this.comments.push(comment);
            this._renderComment(comment);
        });
    }
    _renderComment(comment){
        let $wrapper = $('<div/>', {
            class: 'proceed-to-checkout container-review',
            'data-review': comment.id
        });
        let $author = $(`<div class="review-name-author">${comment.author}</div>`);
        let $text = $(`<p class="review-text-container">${comment.text}</p>`);
        let $delBtn = $(`<button class="remove-review-btn">Remove</button>`);
        $wrapper.append($author);
        $wrapper.append($text);
        $wrapper.append($delBtn);
        $delBtn.click(() => {
            this._remove(comment.id);
        });
        if (!comment.approved){
            let $approve = $(`<button class="approve-review-btn">Approve</button>`);
            $wrapper.append($approve);
            $wrapper.addClass('review-no-approved');
            $approve.click(() => {
                this._approve(comment.id);
            });
        } else {
            $wrapper.addClass('review-approved');
        }
        $(this.container).append($wrapper);
    }
    _approve(id){
        let find = this.comments.find(comment => comment.id === id);
        $(`.container-review[data-review="${id}"]`)
            .addClass('review-approved')
            .removeClass('review-no-approved')
            .find('.approve-review-btn')
            .remove();
        find.approved = true;
    }
    _remove(id){
        let find = this.comments.find(comment => comment.id === id);
        this.comments.splice(this.comments.indexOf(find), 1);
        $(`.container-review[data-review="${id}"]`).remove();
    }
}