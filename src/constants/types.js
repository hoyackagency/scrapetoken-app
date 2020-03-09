// process types
export const PROCESS_TYPE_SEARCHYELP   = 0;
export const PROCESS_TYPE_SCRAPEYELP   = 1;
export const PROCESS_TYPE_VALIDEMAIL   = 2;
export const PROCESS_TYPE_WOODIMPORT   = 3;

export const PROCESS_TYPES = [
    "Scrape Yelp",
    "Search Yelp",
    "Validate E-mail",
    "Woodpecker Import"
];


// process status
export const PROCESS_STATUS_SCHEDULED  = 0;
export const PROCESS_STATUS_RUNNING    = 1;
export const PROCESS_STATUS_CANCELED   = 2;
export const PROCESS_STATUS_FAILED     = 3;
export const PROCESS_STATUS_COMPLETED  = 4;
