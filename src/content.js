const pages = [
  {
    url: "https://auth0.lightning.force.com/lightning/r/Case/",
    buttons: [
      {
        name: "Search Confluence",
        redirect: "https://auth0team.atlassian.net/wiki/spaces/DS/overview",
      },
      {
        name: "Give to Engineering",
        extract: ".slds-align-middle.fade-text",
        redirect: "https://auth0team.atlassian.net/servicedesk/customer/portal/34/group/99/create/548?summary=",
      },
      {
        name: "Give to PSaaS",
        redirect:
          "https://auth0team.atlassian.net/servicedesk/customer/portal/54",
      },
    ],
  },
];

function makeButtons(buttons) {
  let buttonhtml = "";
  for (button of buttons) {
    const attributes = `${
      button.redirect ? "data-redirect=" + button.redirect : ""
    } ${button.extract ? "data-extract=" + button.extract : ""}`;
    buttonhtml += `<button class="dse-quick-actions-button" ${attributes}>${button.name}</button>`;
  }
  return buttonhtml;
}

function makeButtonsWork() {
  for (element of document.querySelectorAll(".dse-quick-actions-button")) {
    if (!element.dataset.extract) {
      element.addEventListener("click", () =>
        window.open(element.dataset.redirect)
      );
    } else {
      element.addEventListener("click", () =>
        // Title must exist
        window.open(`${element.dataset.redirect}${document.querySelector(element.dataset.extract).firstChild.textContext}`)
      );
    }
  }
}

function render() {
  for (page of pages) {
    if (window.location.href.startsWith(page.url)) {
      document
        .querySelector("body")
        .insertAdjacentHTML(
          "afterbegin",
          `<div class="dse-quick-actions">${makeButtons(page.buttons)}</div>`
        );
      makeButtonsWork();
      break;
    }
  }
}

window.onhashchange = render();
