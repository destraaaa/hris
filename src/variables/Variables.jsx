var defaultWidth = window.screen.width > 768 ? window.screen.width * 1 / 3 : window.screen.width;

const Bcolor = [
    '#FF598F', '#FD8A5E', '#E0E300', '#01DDDD', '#00BFAF',
    '#B0A472', '#F5DF65', '#2B9464', '#59C8DF', '#28BE9B',
    '#92DCE0', '#609194', '#EF9950', '#CD1719', '#442D65',
    '#775BA3', '#91C5A9', '#F8E1B4', '#F98A5F', '#E8A0B8',
    '#FFC300', '#BCCF3D', '#02C9C9', '#333333', '#000000',
    '#FF534B', '#021542', '#0241E2', '#AAAAAA', '#3F0082',
    '#DFE0DB', '#FF66CC', '#000000', '#F7F960']

const HBcolor = [
    '#FF59AD', '#FD8A5E', '#e0E3A0', '#01DDAD', '#00BFAF',
    '#B0A4A2', '#F5DFA5', '#2B94A4', '#59C8AF', '#28BEAB',
    '#92DCA0', '#6091A4', '#EF99A0', '#CD17A9', '#442DA5',
    '#775BA3', '#91C5A9', '#F8E1A4', '#F98AAF', '#E8A0A8',
    '#FFC3A0', '#BCCFAD', '#02C9A9', '#3333A3', '#0000A0',
    '#FF53AB', '#0215A2', '#0241A2', '#AAAAAA', '#3F00A2',
    '#DFE0AB', '#FF66AC', '#0000A0', '#F7F9A0']

var style = {
    Wrapper: {},
    Containers: {
        DefaultStyle: {
            position: 'fixed',
            width: defaultWidth,
            padding: '10px 10px 10px 20px',
            zIndex: 9998,
            WebkitBoxSizing: '',
            MozBoxSizing: '',
            boxSizing: '',
            height: 'auto',
            display: 'inline-block',
            border: '0',
            fontSize: '14px',
            WebkitFontSmoothing: "antialiased",
            fontFamily: '"Roboto","Helvetica Neue",Arial,sans-serif',
            fontWeight: '400',
            color: '#FFFFFF'

        },

        tl: {
            top: '0px',
            bottom: 'auto',
            left: '0px',
            right: 'auto'
        },

        tr: {
            top: '0px',
            bottom: 'auto',
            left: 'auto',
            right: '0px'
        },

        tc: {
            top: '0px',
            bottom: 'auto',
            margin: '0 auto',
            left: '50%',
            marginLeft: -(defaultWidth / 2)
        },

        bl: {
            top: 'auto',
            bottom: '0px',
            left: '0px',
            right: 'auto'
        },

        br: {
            top: 'auto',
            bottom: '0px',
            left: 'auto',
            right: '0px'
        },

        bc: {
            top: 'auto',
            bottom: '0px',
            margin: '0 auto',
            left: '50%',
            marginLeft: -(defaultWidth / 2)
        }

    },

    NotificationItem: {
        DefaultStyle: {
            position: 'relative',
            width: '100%',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '14px',
            margin: '10px 0 0',
            padding: '10px',
            display: 'block',
            WebkitBoxSizing: 'border-box',
            MozBoxSizing: 'border-box',
            boxSizing: 'border-box',
            opacity: 0,
            transition: 'all 0.5s ease-in-out',
            WebkitTransform: 'translate3d(0, 0, 0)',
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform, opacity',

            isHidden: {
                opacity: 0
            },

            isVisible: {
                opacity: 1
            }
        },

        success: {
            borderTop: 0,
            backgroundColor: '#a1e82c',
            WebkitBoxShadow: 0,
            MozBoxShadow: 0,
            boxShadow: 0
        },

        error: {
            borderTop: 0,
            backgroundColor: '#fc727a',
            WebkitBoxShadow: 0,
            MozBoxShadow: 0,
            boxShadow: 0
        },

        warning: {
            borderTop: 0,
            backgroundColor: '#ffbc67',
            WebkitBoxShadow: 0,
            MozBoxShadow: 0,
            boxShadow: 0
        },

        info: {
            borderTop: 0,
            backgroundColor: '#63d8f1',
            WebkitBoxShadow: 0,
            MozBoxShadow: 0,
            boxShadow: 0
        }
    },

    Title: {
        DefaultStyle: {
            fontSize: '30px',
            margin: '0',
            padding: 0,
            fontWeight: 'bold',
            color: '#FFFFFF',
            display: 'block',
            left: '15px',
            position: 'absolute',
            top: '50%',
            marginTop: '-15px'
        }

    },

    MessageWrapper: {
        DefaultStyle: {
            marginLeft: '55px',
            marginRight: '30px',
            padding: '0 12px 0 0',
            color: '#FFFFFF',
            maxWidthwidth: '89%'
        }
    },

    Dismiss: {
        DefaultStyle: {
            fontFamily: 'inherit',
            fontSize: '21px',
            color: '#000',
            float: 'right',
            position: 'absolute',
            right: '10px',
            top: '50%',
            marginTop: '-13px',
            backgroundColor: '#FFFFFF',
            display: 'block',
            borderRadius: '50%',
            opacity: '.4',
            lineHeight: '11px',
            width: '25px',
            height: '25px',
            outline: '0 !important',
            textAlign: 'center',
            padding: '6px 3px 3px 3px',
            fontWeight: '300',
            marginLeft: '65px'
        },

        success: {
            // color: '#f0f5ea',
            // backgroundColor: '#a1e82c'
        },

        error: {
            // color: '#f4e9e9',
            // backgroundColor: '#fc727a'
        },

        warning: {
            // color: '#f9f6f0',
            // backgroundColor: '#ffbc67'
        },

        info: {
            // color: '#e8f0f4',
            // backgroundColor: '#63d8f1'
        }
    },

    Action: {
        DefaultStyle: {
            background: '#ffffff',
            borderRadius: '2px',
            padding: '6px 20px',
            fontWeight: 'bold',
            margin: '10px 0 0 0',
            border: 0
        },

        success: {
            backgroundColor: '#a1e82c',
            color: '#ffffff'
        },

        error: {
            backgroundColor: '#fc727a',
            color: '#ffffff'
        },

        warning: {
            backgroundColor: '#ffbc67',
            color: '#ffffff'
        },

        info: {
            backgroundColor: '#63d8f1',
            color: '#ffffff'
        }
    },

    ActionWrapper: {
        DefaultStyle: {
            margin: 0,
            padding: 0
        }
    }
}

const iconsArray = [
    "pe-7s-album",
    "pe-7s-arc",
    "pe-7s-back-2",
    "pe-7s-bandaid",
    "pe-7s-car",
    "pe-7s-diamond",
    "pe-7s-door-lock",
    "pe-7s-eyedropper",
    "pe-7s-female",
    "pe-7s-gym",
    "pe-7s-hammer",
    "pe-7s-headphones",
    "pe-7s-helm",
    "pe-7s-hourglass",
    "pe-7s-leaf",
    "pe-7s-magic-wand",
    "pe-7s-male",
    "pe-7s-map-2",
    "pe-7s-next-2",
    "pe-7s-paint-bucket",
    "pe-7s-pendrive",
    "pe-7s-photo",
    "pe-7s-piggy",
    "pe-7s-plugin",
    "pe-7s-refresh-2",
    "pe-7s-rocket",
    "pe-7s-settings",
    "pe-7s-shield",
    "pe-7s-smile",
    "pe-7s-usb",
    "pe-7s-vector",
    "pe-7s-wine",
    "pe-7s-cloud-upload",
    "pe-7s-cash",
    "pe-7s-close",
    "pe-7s-bluetooth",
    "pe-7s-cloud-download",
    "pe-7s-way",
    "pe-7s-close-circle",
    "pe-7s-id",
    "pe-7s-angle-up",
    "pe-7s-wristwatch",
    "pe-7s-angle-up-circle",
    "pe-7s-world",
    "pe-7s-angle-right",
    "pe-7s-volume",
    "pe-7s-angle-right-circle",
    "pe-7s-users",
    "pe-7s-angle-left",
    "pe-7s-user-female",
    "pe-7s-angle-left-circle",
    "pe-7s-up-arrow",
    "pe-7s-angle-down",
    "pe-7s-switch",
    "pe-7s-angle-down-circle",
    "pe-7s-scissors",
    "pe-7s-wallet",
    "pe-7s-safe",
    "pe-7s-volume2",
    "pe-7s-volume1",
    "pe-7s-voicemail",
    "pe-7s-video",
    "pe-7s-user",
    "pe-7s-upload",
    "pe-7s-unlock",
    "pe-7s-umbrella",
    "pe-7s-trash",
    "pe-7s-tools",
    "pe-7s-timer",
    "pe-7s-ticket",
    "pe-7s-target",
    "pe-7s-sun",
    "pe-7s-study",
    "pe-7s-stopwatch",
    "pe-7s-star",
    "pe-7s-speaker",
    "pe-7s-signal",
    "pe-7s-shuffle",
    "pe-7s-shopbag",
    "pe-7s-share",
    "pe-7s-server",
    "pe-7s-search",
    "pe-7s-film",
    "pe-7s-science",
    "pe-7s-disk",
    "pe-7s-ribbon",
    "pe-7s-repeat",
    "pe-7s-refresh",
    "pe-7s-add-user",
    "pe-7s-refresh-cloud",
    "pe-7s-paperclip",
    "pe-7s-radio",
    "pe-7s-note2",
    "pe-7s-print",
    "pe-7s-network",
    "pe-7s-prev",
    "pe-7s-mute",
    "pe-7s-power",
    "pe-7s-medal",
    "pe-7s-portfolio",
    "pe-7s-like2",
    "pe-7s-plus",
    "pe-7s-left-arrow",
    "pe-7s-play",
    "pe-7s-key",
    "pe-7s-plane",
    "pe-7s-joy",
    "pe-7s-photo-gallery",
    "pe-7s-pin",
    "pe-7s-phone",
    "pe-7s-plug",
    "pe-7s-pen",
    "pe-7s-right-arrow",
    "pe-7s-paper-plane",
    "pe-7s-delete-user",
    "pe-7s-paint",
    "pe-7s-bottom-arrow",
    "pe-7s-notebook",
    "pe-7s-note",
    "pe-7s-next",
    "pe-7s-news-paper",
    "pe-7s-musiclist",
    "pe-7s-music",
    "pe-7s-mouse",
    "pe-7s-more",
    "pe-7s-moon",
    "pe-7s-monitor",
    "pe-7s-micro",
    "pe-7s-menu",
    "pe-7s-map",
    "pe-7s-map-marker",
    "pe-7s-mail",
    "pe-7s-mail-open",
    "pe-7s-mail-open-file",
    "pe-7s-magnet",
    "pe-7s-loop",
    "pe-7s-look",
    "pe-7s-lock",
    "pe-7s-lintern",
    "pe-7s-link",
    "pe-7s-like",
    "pe-7s-light",
    "pe-7s-less",
    "pe-7s-keypad",
    "pe-7s-junk",
    "pe-7s-info",
    "pe-7s-home",
    "pe-7s-help2",
    "pe-7s-help1",
    "pe-7s-graph3",
    "pe-7s-graph2",
    "pe-7s-graph1",
    "pe-7s-graph",
    "pe-7s-global",
    "pe-7s-gleam",
    "pe-7s-glasses",
    "pe-7s-gift",
    "pe-7s-folder",
    "pe-7s-flag",
    "pe-7s-filter",
    "pe-7s-file",
    "pe-7s-expand1",
    "pe-7s-exapnd2",
    "pe-7s-edit",
    "pe-7s-drop",
    "pe-7s-drawer",
    "pe-7s-download",
    "pe-7s-display2",
    "pe-7s-display1",
    "pe-7s-diskette",
    "pe-7s-date",
    "pe-7s-cup",
    "pe-7s-culture",
    "pe-7s-crop",
    "pe-7s-credit",
    "pe-7s-copy-file",
    "pe-7s-config",
    "pe-7s-compass",
    "pe-7s-comment",
    "pe-7s-coffee",
    "pe-7s-cloud",
    "pe-7s-clock",
    "pe-7s-check",
    "pe-7s-chat",
    "pe-7s-cart",
    "pe-7s-camera",
    "pe-7s-call",
    "pe-7s-calculator",
    "pe-7s-browser",
    "pe-7s-box2",
    "pe-7s-box1",
    "pe-7s-bookmarks",
    "pe-7s-bicycle",
    "pe-7s-bell",
    "pe-7s-battery",
    "pe-7s-ball",
    "pe-7s-back",
    "pe-7s-attention",
    "pe-7s-anchor",
    "pe-7s-albums",
    "pe-7s-alarm",
    "pe-7s-airplay"
];


var optionsPie = {
    labelInterpolationFnc: function (value) {
        return value[0]
    }
};

var responsiveOptionsPie = [
    ['screen and (min-width: 640px)', {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc: function (value) {
            return value;
        }
    }],
    ['screen and (min-width: 1024px)', {
        labelOffset: 40,
        chartPadding: 20
    }]
];

const dataSet = [
    ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
    ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
    ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"],
    ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060"],
    ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"],
    ["Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000"],
    ["Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500"],
    ["Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900"],
    ["Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500"],
    ["Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600"],
    ["Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560"],
    ["Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000"],
    ["Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600"],
    ["Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500"],
    ["Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750"],
    ["Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500"],
    ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000"],
    ["Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500"],
    ["Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000"],
    ["Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500"],
    ["Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000"],
    ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000"],
    ["Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450"],
    ["Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600"],
    ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000"],
    ["Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575"],
    ["Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650"],
    ["Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850"],
    ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000"],
    ["Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000"],
    ["Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400"],
    ["Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500"],
    ["Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000"],
    ["Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500"],
    ["Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050"],
    ["Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675"]
];


const dataSetNonopsOffered = [
    ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800", "2011/04/25", "$320,800"],
    ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750", "2011/04/25", "$320,800"],
    ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000", "2011/04/25", "$320,800"],
    ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060", "2011/04/25", "$320,800"],
    ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700", "2011/04/25", "$320,800"],
    ["Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000", "2011/04/25", "$320,800"],
    ["Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500", "2011/04/25", "$320,800"],
    ["Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900", "2011/04/25", "$320,800"],
    ["Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500", "2011/04/25", "$320,800"],
    ["Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600", "2011/04/25", "$320,800"],
    ["Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560", "2011/04/25", "$320,800"],
    ["Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000", "2011/04/25", "$320,800"],
    ["Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600", "2011/04/25", "$320,800"],
    ["Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500", "2011/04/25", "$320,800"],
    ["Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750", "2011/04/25", "$320,800"],
    ["Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500", "2011/04/25", "$320,800"],
    ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000", "2011/04/25", "$320,800"],
    ["Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500", "2011/04/25", "$320,800"],
    ["Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000", "2011/04/25", "$320,800"],
    ["Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500", "2011/04/25", "$320,800"],
    ["Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000", "2011/04/25", "$320,800"],
    ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000", "2011/04/25", "$320,800"],
    ["Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450", "2011/04/25", "$320,800"],
    ["Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600", "2011/04/25", "$320,800"],
    ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000", "2011/04/25", "$320,800"],
    ["Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575", "2011/04/25", "$320,800"],
    ["Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650", "2011/04/25", "$320,800"],
    ["Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850", "2011/04/25", "$320,800"],
    ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000", "2011/04/25", "$320,800"],
    ["Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000", "2011/04/25", "$320,800"],
    ["Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400", "2011/04/25", "$320,800"],
    ["Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500", "2011/04/25", "$320,800"],
    ["Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000", "2011/04/25", "$320,800"],
    ["Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500", "2011/04/25", "$320,800"],
    ["Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050", "2011/04/25", "$320,800"],
    ["Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675", "2011/04/25", "$320,800"]
];

module.exports = {
    style,
    dataSet,
    dataSetNonopsOffered,
    HBcolor,
    Bcolor,
    iconsArray,
    optionsPie, responsiveOptionsPie,
};
