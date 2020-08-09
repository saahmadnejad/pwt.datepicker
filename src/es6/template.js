/**
 * @type {string}
 */
const Template = `
{{#theme.enabled}}
<style>
#{{Id}} .datepicker-plot-area {
  background-color: {{theme.values.plotArea.backgroundColor}};
  box-shadow: {{theme.values.plotArea.boxShadow}};
  border: {{theme.values.plotArea.border}};
}
#{{Id}} .datepicker-plot-area .datepicker-day-view .table-days td .alter-calendar-day{
  color: {{theme.values.dayCell.hover.fontColor}};
}
#{{Id}} .datepicker-plot-area .datepicker-day-view .table-days td{
  font-size: {{theme.values.dayCell.fontSize}};
  font-weight: {{theme.values.dayCell.fontWeight}};
  padding: 4px;
}
#{{Id}} .datepicker-plot-area .datepicker-day-view .table-days td:not(.disabled) span:not(.other-month) {
  border: {{theme.values.dayCell.borderWidth}}px solid {{theme.values.dayCell.borderColor}};
  color: {{theme.values.dayCell.hover.fontColor}} !important;
  background-color: {{theme.values.dayCell.backgroundColor}};
}
#{{Id}} .datepicker-plot-area .datepicker-day-view .table-days td:not(.disabled).selected span:hover, .datepicker-plot-area .datepicker-day-view .table-days td:not(.disabled).selected span{
  background-color: {{theme.values.dayCell.hover.backgroundColor}} !important;
  border: {{theme.values.dayCell.hover.borderWidth}}px {{theme.values.dayCell.hover.borderStyle}} {{theme.values.dayCell.hover.borderColor}} !important;
  color: {{theme.values.dayCell.hover.fontColor}} !important;
  text-shadow: none;
}
#{{Id}} .datepicker-plot-area .datepicker-day-view .table-days td span.other-month{
  color: {{theme.values.dayCell.otherMonthFontColor}};
  background-color: {{theme.values.dayCell.otherMonthBackgroundColor}};
}
#{{Id}} .datepicker-plot-area .datepicker-day-view .month-grid-box .header .header-row-cell{
  color: {{theme.values.weekday.fontColor}};
  font-weight: {{theme.values.weekday.fontWeight}};
  font-size: {{theme.values.weekday.fontSize}};
}
#{{Id}} .datepicker-plot-area .datepicker-day-view .table-days td.disabled span:hover, #{{Id}} .datepicker-plot-area .datepicker-day-view .table-days td.selected.disabled span {
  color: {{theme.values.dayCell.disableFontColor}};
  text-shadow: none;
}
#{{Id}} .datepicker-plot-area .datepicker-month-view .month-item.selected {
  background-color: {{theme.values.monthCell.backgroundColor}};
}
#{{Id}} .datepicker-plot-area .datepicker-year-view .year-item.selected {
  background-color: {{theme.values.yearCell.backgroundColor}};
}
</style>
{{/theme.enabled}}
<div id="{{plotId}}" class="datepicker-plot-area {{cssClass}}">
    {{#navigator.enabled}}
        <div data-navigator class="datepicker-navigator">
            <div class="pwt-btn pwt-btn-next">{{navigator.text.btnNextText}}</div>
            <div class="pwt-btn pwt-btn-switch">{{navigator.switch.text}}</div>
            <div class="pwt-btn pwt-btn-prev">{{navigator.text.btnPrevText}}</div>
        </div>
    {{/navigator.enabled}}
    <div class="datepicker-grid-view" >
    {{#days.enabled}}
        {{#days.viewMode}}
        <div class="datepicker-day-view" >    
            <div class="month-grid-box">
                <div class="header">
                    <div class="title"></div>
                    <div class="header-row">
                        {{#weekdays.list}}
                            <div class="header-row-cell">{{.}}</div>
                        {{/weekdays.list}}
                    </div>
                </div>    
                <table cellspacing="0" class="table-days">
                    <tbody>
                        {{#days.list}}
                           
                            <tr>
                                {{#.}}
                                    {{#enabled}}
                                        <td data-date="{{dataDate}}" data-unix="{{dataUnix}}" {{^otherMonth}}{{#selected}}class="selected"{{/selected}}{{/otherMonth}}>
                                            <span  class="{{#otherMonth}}other-month{{/otherMonth}}">{{title}}</span>
                                            {{#altCalendarShowHint}}
                                            <i  class="alter-calendar-day">{{alterCalTitle}}</i>
                                            {{/altCalendarShowHint}}
                                        </td>
                                    {{/enabled}}
                                    {{^enabled}}
                                        <td data-date="{{dataDate}}" data-unix="{{dataUnix}}" class="disabled">
                                            <span class="{{#otherMonth}}other-month{{/otherMonth}}">{{title}}</span>
                                            {{#altCalendarShowHint}}
                                            <i  class="alter-calendar-day">{{alterCalTitle}}</i>
                                            {{/altCalendarShowHint}}
                                        </td>
                                    {{/enabled}}
                                    
                                {{/.}}
                            </tr>
                        {{/days.list}}
                    </tbody>
                </table>
            </div>
        </div>
        {{/days.viewMode}}
    {{/days.enabled}}
    
    {{#month.enabled}}
        {{#month.viewMode}}
            <div class="datepicker-month-view">
                {{#month.list}}
                    {{#enabled}}               
                        <div data-year="{{year}}" data-month="{{dataMonth}}" class="month-item {{#selected}}selected{{/selected}}">{{title}}</small></div>
                    {{/enabled}}
                    {{^enabled}}               
                        <div data-year="{{year}}"data-month="{{dataMonth}}" class="month-item month-item-disable {{#selected}}selected{{/selected}}">{{title}}</small></div>
                    {{/enabled}}
                {{/month.list}}
            </div>
        {{/month.viewMode}}
    {{/month.enabled}}
    
    {{#year.enabled }}
        {{#year.viewMode }}
            <div class="datepicker-year-view" >
                {{#year.list}}
                    {{#enabled}}
                        <div data-year="{{dataYear}}" class="year-item {{#selected}}selected{{/selected}}">{{title}}</div>
                    {{/enabled}}
                    {{^enabled}}
                        <div data-year="{{dataYear}}" class="year-item year-item-disable {{#selected}}selected{{/selected}}">{{title}}</div>
                    {{/enabled}}                    
                {{/year.list}}
            </div>
        {{/year.viewMode }}
    {{/year.enabled }}
    
    </div>
    {{#time}}
    {{#enabled}}
    <div class="datepicker-time-view">
        {{#hour.enabled}}
            <div class="hour time-segment" data-time-key="hour">
                <div class="up-btn" data-time-key="hour">▲</div>
                <input disabled value="{{hour.title}}" type="text" placeholder="hour" class="hour-input">
                <div class="down-btn" data-time-key="hour">▼</div>                    
            </div>       
            <div class="divider">
                <span>:</span>
            </div>
        {{/hour.enabled}}
        {{#minute.enabled}}
            <div class="minute time-segment" data-time-key="minute" >
                <div class="up-btn" data-time-key="minute">▲</div>
                <input disabled value="{{minute.title}}" type="text" placeholder="minute" class="minute-input">
                <div class="down-btn" data-time-key="minute">▼</div>
            </div>        
            <div class="divider second-divider">
                <span>:</span>
            </div>
        {{/minute.enabled}}
        {{#second.enabled}}
            <div class="second time-segment" data-time-key="second"  >
                <div class="up-btn" data-time-key="second" >▲</div>
                <input disabled value="{{second.title}}"  type="text" placeholder="second" class="second-input">
                <div class="down-btn" data-time-key="second" >▼</div>
            </div>
            <div class="divider meridian-divider"></div>
            <div class="divider meridian-divider"></div>
        {{/second.enabled}}
        {{#meridian.enabled}}
            <div class="meridian time-segment" data-time-key="meridian" >
                <div class="up-btn" data-time-key="meridian">▲</div>
                <input disabled value="{{meridian.title}}" type="text" class="meridian-input">
                <div class="down-btn" data-time-key="meridian">▼</div>
            </div>
        {{/meridian.enabled}}
    </div>
    {{/enabled}}
    {{/time}}
    
    {{#toolbox}}
    {{#enabled}}
    <div class="toolbox">
        {{#toolbox.submitButton.enabled}}
            <div class="pwt-btn-submit">{{submitButtonText}}</div>
        {{/toolbox.submitButton.enabled}}        
        {{#toolbox.todayButton.enabled}}
            <div class="pwt-btn-today">{{todayButtonText}}</div>
        {{/toolbox.todayButton.enabled}}        
        {{#toolbox.calendarSwitch.enabled}}
            <div class="pwt-btn-calendar">{{calendarSwitchText}}</div>
        {{/toolbox.calendarSwitch.enabled}}
    </div>
    {{/enabled}}
    {{^enabled}}
        {{#onlyTimePicker}}
        <div class="toolbox">
            <div class="pwt-btn-submit">{{submitButtonText}}</div>
        </div>
        {{/onlyTimePicker}}
    {{/enabled}}
    {{/toolbox}}
</div>
`;

module.exports = Template;
