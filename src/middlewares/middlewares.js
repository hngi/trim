
import { validateCookie } from './validateCookie';
import { renderLandingPage } from './renderLandingPage';
import{ aboutPage } from './aboutPage';
import { validateOwnDomain, urlAlreadyTrimmedByUser, stripUrl, customUrlExists } from './validateUrl';
import {  getSyncedData } from './getSyncData';

export { renderLandingPage, aboutPage, validateOwnDomain, validateCookie, urlAlreadyTrimmedByUser, stripUrl, customUrlExists, getSyncedData };
