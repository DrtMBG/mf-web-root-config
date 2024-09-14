import 'regenerator-runtime';
import * as jquery from 'jquery';
import {
    constructApplications,
    constructLayoutEngine,
    constructRoutes,
} from 'single-spa-layout';
import { registerApplication, start } from 'single-spa';

window['$'] = jquery;
window['jQuery'] = jquery;

const data = {
    loaders: {
        projectmbhLoader: ``,
    },
    props: null,
};

let spinnerTimeout;

const routes = constructRoutes(
    document.querySelector('#single-spa-layout'),
    data
);

function showSpinner() {
    if (!document.getElementById('loader')) {
        const spinnerElement = document.createElement('div');
        spinnerElement.id = 'loader';
        spinnerElement.style.zIndex = '9999';
        spinnerElement.innerHTML = `
         <div class="loader-container">
          <div class="loader">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
           <div class="loading-text">Cargando...</div>
          </div>`;
        document.body.appendChild(spinnerElement);
    }
}

function hideSpinner() {
    const spinnerElement = document.getElementById('loader');
    if (spinnerElement) {
        spinnerElement.remove();
    }
}

// Función para introducir un retraso
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const applications = constructApplications({
    routes,
    async loadApp({ name }) {
        showSpinner();
        await delay(1500);
        try {
            const module = await System.import(name);
            return {
                bootstrap: module.bootstrap,
                mount: module.mount,
                unmount: module.unmount,
            };
        } catch (error) {
            console.error(`Error loading application ${name}:`, error);
            return {
                bootstrap: () => Promise.resolve(),
                mount: () => Promise.resolve(),
                unmount: () => Promise.resolve(),
            };
        } finally {
            hideSpinner();
        }
    },
});

constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
start();
