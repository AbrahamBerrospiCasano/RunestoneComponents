/*
The TimedActivecode classes are a great example of where multiple inheritance would be useful
But since Javascript does not suppport multiple inheritance we use the mixin pattern.

*/
import LiveCode from "./livecode";
import { ActiveCode } from "./activecode";

TimedActiveCodeMixin = {
    timedInit: function(opts) {
        this.hideButtons();
        this.addHistoryScrubber();
        this.isTimed = true;
        this.needsReinitialization = true; // the run button click listener needs to be reinitialized
        this.containerDiv.classList.add("timedComponent");
        edList[this.divid] = this;
    },

    hideButtons: function() {
        var buttonList = [
            this.saveButton,
            this.loadButton,
            this.gradeButton,
            this.showHideButt,
            this.coachButton,
            this.atButton
        ];
        for (var i = 0; i < buttonList.length; i++) {
            if (buttonList[i] !== undefined && buttonList[i] !== null)
                $(buttonList[i]).hide();
        }
    },

    // bje - not needed anymore
    renderTimedIcon: function(component) {
        // renders the clock icon on timed components.    The component parameter
        // is the element that the icon should be appended to.
        var timeIconDiv = document.createElement("div");
        var timeIcon = document.createElement("img");
        $(timeIcon).attr({
            src: "../_static/clock.png",
            style: "width:15px;height:15px"
        });
        timeIconDiv.className = "timeTip";
        timeIconDiv.title = "";
        timeIconDiv.appendChild(timeIcon);
        $(component).prepend(timeIconDiv);
    },

    checkCorrectTimed: function() {
        if (this.pct_correct) {
            if (this.pct_correct >= 100.0) {
                return "T";
            } else {
                return "F";
            }
        } else {
            return "I"; // we ignore this in the grading if no unittests
        }
    },

    hideFeedback: function() {
        $(this.output).css("visibility", "hidden");
    },

    processTimedSubmission: function(logFlag) {
        $(this.runButton).hide();
        $(`#${this.divid}_unit_results`).show();
        $(this.codeDiv).addClass("ac-disabled");
    },

    reinitializeListeners: function() {
        // re-attach the run button listener
        $(this.runButton).click(this.runProg.bind(this));
        $(this.codeDiv).show();
        this.runButton.disabled = false;
        $(this.codeDiv).removeClass("ac-disabled");
        $(this.histButton).click(this.addHistoryScrubber.bind(this));
        if (this.historyScrubber !== null) {
            $(this.historyScrubber).slider({
                max: this.history.length - 1,
                value: this.history.length - 1,
                slide: this.slideit.bind(this),
                change: this.slideit.bind(this)
            });
        }
    }
};

export class TimedLiveCode extends LiveCode {
    constructor(opts) {
        super(opts);
        this.timedInit(opts);
    }
}

Object.assign(TimedLiveCode.prototype, TimedActiveCodeMixin);

export class TimedActiveCode extends ActiveCode {
    constructor(opts) {
        super(opts);
        this.timedInit(opts);
    }
}
Object.assign(TimedActiveCode.prototype, TimedActiveCodeMixin);

export class TimedJSActiveCode extends JSActiveCode {
    constructor(opts) {
        super(opts);
        this.timedInit(opts);
    }
}
Object.assign(TimedJSActiveCode.prototype, TimedActiveCodeMixin);

export class TimedHTMLActiveCode extends HTMLActiveCode {
    constructor(opts) {
        super(opts);
        this.timedInit(opts);
    }
}
Object.assign(TimedHTMLActiveCode.prototype, TimedActiveCodeMixin);

export class TimedSQLActiveCode extends SQLActiveCode {
    constructor(opts) {
        super(opts);
        this.timedInit(opts);
    }
}
Object.assign(TimedSQLActiveCode.prototype, TimedActiveCodeMixin);
