import { Controller } from "@hotwired/stimulus";
import { patch } from "@rails/request.js";
import { removeAllListeners } from "nodemon";
export default class extends Controller {
  static targets = ["image", "title", "save"];
  static classes = ["loading"];
  static values = { id: String };
  connect() {
    const title = document.createElement("p");
    title.textContent = this.imageTarget.alt;
    title.contentEditable = true;
    title.dataset.imagesTarget = "title";
    title.dataset.action = "click->images#editTitle";
    this.element.appendChild(title);
  }

  editTitle(e) {
    if (!this.hasSaveTarget) {
      const btn = document.createElement("button");
      btn.textContent = "Save";
      btn.dataset.imagesTarget = "save";
      btn.dataset.action = "click->images#saveTitle";
      btn.classList = "btn btn-primary btn-sm";
      e.target.insertAdjacentElement("afterend", btn);
    }
  }

  async saveTitle(ev) {
    ev.preventDefault();
    ev.target.disabled = true;
    ev.target.classList.add(this.loadingClass);

    // const formData = new FormData();
    // formData.append("image[title]", this.titleTarget.innerText);
    //await this.doPatch(`/api/images/${this.idValue}`, formData);
    await this.doPatch(`/api/images/${this.idValue}`,
      JSON.stringify({image: {title: this.titleTarget.innerText}}));
    ev.target.remove();
  }

  getUrl(e) {
    this.dispatch("copy", {
      detail: { content: `Image ${e.target.src} has been copied!` },
    });
    navigator.clipboard.writeText(e.target.src);
  }

  // imageTargetConnected(e) {
  //   console.log(e.alt);
  // }

  // titleTargetConnected(el) {
  //   console.log(el);
  // }

  async doPatch(url, body) {
    const responce = await patch(url, { body: body });
    if (!responce.ok) {
      raise("Patch failed!");
    }

    // const csrfToken = document.getElementsByName("csrf-token")[0].content;

    // await fetch(url, {
    //   method: "PATCH",
    //   body: body,
    //   headers: { "X-CSRF-Token": csrfToken },
    // });
  }
}
