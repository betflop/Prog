// setTimeout(function() {

const fontFamily = "Roboto Mono";
const fontSize = "20";
const option = {
  cursorBlink: true,
  // rendererType: "canvas",
  rendererType: "dom",
  letterSpacing: 0,
};

if (fontFamily) {
  option["fontFamily"] = fontFamily;
}

if (fontSize) {
  option["fontSize"] = fontSize;
}

const terminal1 = new Terminal(option);
const fitAddon1 = new FitAddon.FitAddon();
const linkAddon1 = new WebLinksAddon.WebLinksAddon();

terminal1.loadAddon(fitAddon1);
terminal1.loadAddon(linkAddon1);
terminal1.open(document.getElementById('terminal1'));
terminal1.focus();
fitAddon1.fit();

const socket1 = new WebSocket('ws://127.0.0.1:8880/ws1');
// const socket1 = new WebSocket('ws://10.0.0.2:9994/ws');

// workaround
// for redraw terminal1 screen when reload window
const redraw = (socket1, msg) => {
  msg.data.cols--
  terminal1.resize(msg.data.cols, msg.data.rows)
  socket1.send(JSON.stringify(msg));

  msg.data.cols++
  terminal1.resize(msg.data.cols, msg.data.rows)
  socket1.send(JSON.stringify(msg));
}

socket1.onopen = () => {
    console.log("onopen")
  const msg = {
    event: "resize",
    data: {
      "cols": terminal1.cols,
      "rows": terminal1.rows,
    },
  };
  socket1.send(JSON.stringify(msg));

  redraw(socket1, msg)

  terminal1.onData(data => {

    console.log("ondata")
    switch (socket1.readyState) {
      case WebSocket.CLOSED:
      case WebSocket.CLOSING:
        terminal1.dispose();
        return;
    }
    const msg = {
      event: "sendKey",
      data: data,
    }
    socket1.send(JSON.stringify(msg));
  })

  socket1.onclose = () => {
    terminal1.writeln('[Disconnected]');
  }

  socket1.onmessage = (e) => {

    console.log("onmessage")
    terminal1.write(e.data);
  }

  terminal1.onResize((size) => {
    terminal1.resize(size.cols, size.rows);
    const msg = {
      event: "resize",
      data: {
        cols: size.cols,
        rows: size.rows,
      },
    }
    socket1.send(JSON.stringify(msg));
  });

  window.onbeforeunload = () => {
    socket1.close();
  }

  window.addEventListener("resize", () => {
    fitAddon1.fit()
  })
}

// } , 5000);
