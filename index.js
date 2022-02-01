class Editor {
  constructor(languages) {
    if (!Array.isArray(languages)) {
      alert("There was an error.");
      return;
    }

    languages.forEach((lang) => {
      let element = document.querySelector(`#${lang}`);
      let dnldBtn = document.querySelector(`#dnld_${lang}`);

      element.addEventListener("keyup", this.handleCompilation);
      dnldBtn.addEventListener("click", () => this.download(lang));
    });
  }

  handleCompilation() {
    const _html = document.querySelector("#html").innerText;
    const _css = document.querySelector("#css").innerText;
    const _js = document.querySelector("#js").innerText;
    var code = document.getElementById("code").contentWindow.document;

    code.open();
    code.writeln(
      _html + "<style>" + _css + "</style>" + "<script>" + _js + "</script>"
    );
    code.close();
  }

  download(ext) {
    let code = document.querySelector(`#${ext}`).innerText;
    if (ext === "html") {
      let html =
        "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8' /><meta http-equiv='X-UA-Compatible' content='IE=edge' />    <meta name='viewport' content='width=device-width, initial-scale=1.0' /><title>Online Editor</title><link rel='stylesheet' href='./style.css' /></head><body>" +
        code +
        "<script src='./index.js'></script></body></html>";
      this.handleDownload("index.html", html);
    } else if (ext === "css") {
      this.handleDownload("style.css", code);
    } else if (ext === "js") {
      this.handleDownload("index.js", code);
    }
  }

  handleDownload(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}

const executor = new Editor(["html", "css", "js"]);
