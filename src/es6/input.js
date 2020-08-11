let Helper = require('./helper');
let PersianDateParser = require('./parser');
/**
 * Do every thing about input element like get default value, set new value, set alt field input and etc.
 */
class Input {

    /**
     * @param {Model} model
     * @param {Element}
     * @return {Input}
     */
    constructor(model, inputElement) {

        /**
         * @type {Object}
         */
        this.model = model;

        /**
         * @type {boolean}
         * @private
         */
        this._firstUpdate = true;

        /**
         * @type {Element}
         */
        this.elem = inputElement;

        if (this.model.options.observer) {
            this.observe();
        }

        this.addInitialClass();

        /**
         * @type {Number}
         */
        this.initialUnix = null;

        if (this.model.options.inline == false) {
            this._attachInputElementEvents();
        }

        return this;
    }


    addInitialClass() {
        $(this.elem).addClass('pwt-datepicker-input-element');
    }

    parseInput(inputString) {
        let parse = new PersianDateParser(),
            that = this;
        if (parse.parse(inputString) !== undefined) {
            let pd = this.model.PersianDate.date(parse.parse(inputString)).valueOf();
            that.model.state.setSelectedDateTime('unix', pd);
            that.model.state.setViewDateTime('unix', pd);
            that.model.view.render();
        }
    }

    observe() {
        let that = this;
        /////////////////   Manipulate by Copy And paste
        $(that.elem).bind('paste', function (e) {
            Helper.delay(function () {
                that.parseInput(e.target.value);
            }, 60);
        });
        let typingTimer,
            doneTypingInterval = that.model.options.inputDelay,
            ctrlDown = false,
            ctrlKey = [17, 91], vKey = 86;

        $(document).keydown(function (e) {
            if ($.inArray(e.keyCode, ctrlKey) > 0)
                ctrlDown = true;
        }).keyup(function (e) {
            if ($.inArray(e.keyCode, ctrlKey) > 0)
                ctrlDown = false;
        });

        $(that.elem).bind('keyup', function (e) {
            let $self = $(this);
            let trueKey = false;
            if (e.keyCode === 8 || e.keyCode < 105 && e.keyCode > 96 || e.keyCode < 58 && e.keyCode > 47 || (ctrlDown && (e.keyCode == vKey || $.inArray(e.keyCode, ctrlKey) > 0  ))) {
                trueKey = true;
            }
            if (trueKey) {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(function () {
                    doneTyping($self);
                }, doneTypingInterval);
            }
        });

        $(that.elem).on('keydown', function () {
            clearTimeout(typingTimer);
        });
        function doneTyping($self) {
            that.parseInput($self.val());
        }

        /////////////////   Manipulate by alt changes
        // TODO
        // self.model.options.altField.bind("change", function () {
        //     //if (!self._flagSelfManipulate) {
        //         let newDate = new Date($(this).val());
        //         if (newDate !== "Invalid Date") {
        //             let newPersainDate = this.model.PersianDate.date(newDate);
        //             self.selectDate(newPersainDate.valueOf());
        //         }
        //   //  }
        // });
    }

    /**
     * @private
     * @desc attach events to input field
     */
    _attachInputElementEvents() {
        let that = this;
        let closePickerHandler = function (e) {
            if (!$(e.target).is(that.elem) && !$(e.target).is(that.model.view.$container) &&
                $(e.target).closest('#' + that.model.view.$container.attr('id')).length == 0 && !$(e.target).is($(that.elem).children())) {
                that.model.api.hide();
                $('body').unbind('click', closePickerHandler);
            }
        };

        $(this.elem).on('focus click', Helper.debounce(function (evt) {
            that.model.api.show();
            if (that.model.state.ui.isInline === false) {
                $('body').unbind('click', closePickerHandler).bind('click', closePickerHandler);
            }
            if (Helper.isMobile) {
                $(this).blur();
            }
            evt.stopPropagation();
            return false;
        }, 200));

        $(this.elem).on('keydown', Helper.debounce(function (evt) {
            if (evt.which === 9){
              that.model.api.hide();
              return false;
            }
        }, 200));

    }


    /**
     * @desc get <input/> element position
     * @return {{top: Number, left: Number}}
     * @todo remove jquery
     */
    getInputPosition() {
        return $(this.elem).offset();
    }


    /**
     * @desc get <input/> element size
     * @return {{width: Number, height: Number}}
     * @todo remove jquery
     */
    getInputSize() {
        return {
            width: $(this.elem).outerWidth(),
            height: $(this.elem).outerHeight()
        };
    }


    /**
     * @desc update <input/> element value
     * @param {Number} unix
     * @todo remove jquery
     * @private
     */
    _updateAltField(unix) {
        let value = this.model.options.altFieldFormatter(unix);
        $(this.model.options.altField).val(value);
    }

    _updateAltFieldForMultiSelectMode(unix) {
        let value = this.model.options.altFieldFormatter(unix);
        let str = $(this.model.options.altField).val();
        if (str.indexOf(value) >= 0){
            if (str.indexOf(value + '|') >= 0){
                str = str.replace(value + '|', '');
                $(this.model.options.altField).val(str);
            }else if (str.indexOf('|' + value) >= 0){
                str = str.replace('|' + value, '');
                $(this.model.options.altField).val(str);
            }else{
                str = str.replace(value, '');
                $(this.model.options.altField).val(str);
            }
        }else{
            let val = $(this.model.options.altField).val();
            if (val)
                $(this.model.options.altField).val(val + '|' + value);
            else
                $(this.model.options.altField).val(value);
        }
    }

    /**
     * @desc update <input/> element value
     * @param {Number} unix
     * @todo remove jquery
     * @private
     */
    _updateInputField(unix) {
        let value = this.model.options.formatter(unix);
        if ($(this.elem).val() != value) {
            $(this.elem).val(value);
        }
    }

    _updateInputFieldForMultiSelectMode(unix) {
        let value = this.model.options.formatter(unix);
        let str = $(this.elem).val();
        if (str.indexOf(value) >= 0){
            if (str.indexOf(value + '|') >= 0){
                str = str.replace(value + '|', '');
                $(this.elem).val(str);
            }else if(str.indexOf('|' + value) >= 0){
                str = str.replace('|' + value, '');
                $(this.elem).val(str);
            }else{
                str = str.replace(value, '');
                $(this.elem).val(str);
            }
        }else{
            let val = $(this.elem).val();
            if (val){
                $(this.elem).val(val + '|' + value);
            }else{
                $(this.elem).val(val);
            }
        }
    }


    /**
     * @param unix
     */
    update(unix) {
        if (this.model.options.initialValue == false && this._firstUpdate) {
            this._firstUpdate = false;
        } else {
            this._updateInputField(unix);
            this._updateAltField(unix);

        }
    }

    updateForMultiSelectMode(unixTime) {
        this._updateAltFieldForMultiSelectMode(unixTime);
        this._updateInputFieldForMultiSelectMode(unixTime);
    }


    /**
     * @desc return initial value
     * @return {Number} - unix
     */
    getOnInitState() {
        const persianDatePickerTimeRegex = '^([0-1][0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9]))?$';
        let gregorianDate = null,
            $inputElem = $(this.elem),
            inputValue;

        // Define input value by check inline mode and input mode

        if ($inputElem[0].nodeName === 'INPUT') {
            inputValue = $inputElem[0].getAttribute('value');
        }
        else {
            inputValue = $inputElem.data('date');
        }

        // Check time string by regex
        if (inputValue && inputValue.toString().match(persianDatePickerTimeRegex)) {
            let timeArray = inputValue.split(':'),
                tempDate = new Date();
            tempDate.setHours(timeArray[0]);
            tempDate.setMinutes(timeArray[1]);
            if (timeArray[2]) {
                tempDate.setSeconds(timeArray[2]);
            } else {
                tempDate.setSeconds(0);
            }
            this.initialUnix = tempDate.valueOf();
        }
        else {
            if (this.model.options.initialValueType === 'persian' && inputValue) {
                gregorianDate = this._initPersianDate(inputValue);
            } else if (this.model.options.initialValueType === 'unix' && inputValue) {
                gregorianDate = this._initUnixDate(inputValue);
            } else if (inputValue) {
                gregorianDate = this._initGregorianDate(inputValue);
            }
            if (gregorianDate && gregorianDate != 'undefined') {
                this.initialUnix = gregorianDate;
            } else {
                let d = new Date();
                d.setHours(12);
                d.setMinutes(0);
                d.setSeconds(0);
                d.setMilliseconds(0);
                this.initialUnix = new Date(d.toString()).valueOf();
            }
        }
        return this.initialUnix;
    }

    _initPersianDate(inputValue){
        let parse = new PersianDateParser();
        if (this.model.options.multiSelect){
            return inputValue;
        }else{
            let pd = new persianDate(parse.parse(inputValue)).valueOf();
            return new Date(pd).valueOf();
        }
    }

    _initGregorianDate(inputValue){
        if (this.model.options.multiSelect){
            return inputValue;
        }else{
            return new Date(inputValue).valueOf();
        }
    }

    _initUnixDate(inputValue){
        if (this.model.options.multiSelect){
            if (this.model.state.selectedInMultiSelectMode.length > 0) {
                return null;
            }
            return inputValue;
        }else{
            return parseInt(inputValue);
        }
    }

}

module.exports = Input;
