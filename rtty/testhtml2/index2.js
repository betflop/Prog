const fontFamily2 = "{fontFamily}";
const fontSize2 = "{fontSize}";
const option2 = {
  cursorBlink: true,
  rendererType: "canvas",
};

if (fontFamily2) {
  option2["fontFamily"] = fontFamily2;
}

if (fontSize2) {
  option2["fontSize"] = fontSize2;
}

const terminal2 = new Terminal(option2);
const fitAddon2 = new FitAddon.FitAddon();
const linkAddon2 = new WebLinksAddon.WebLinksAddon();

terminal2.loadAddon(fitAddon2);
terminal2.loadAddon(linkAddon2);
terminal2.open(document.getElementById('terminal2'));
terminal2.focus();
fitAddon2.fit();

const socket2 = new WebSocket('ws://127.0.0.1:8880/ws2');
// const socket2 = new WebSocket('ws://127.0.0.1:8880/ws1');

// workaround
// for redraw terminal2 screen when reload window
const redraw2 = (socket2, msg) => {
  msg.data.cols--
  terminal2.resize(msg.data.cols, msg.data.rows)
  socket2.send(JSON.stringify(msg));

  msg.data.cols++
  terminal2.resize(msg.data.cols, msg.data.rows)
  socket2.send(JSON.stringify(msg));
}

socket2.onopen = () => {
  const msg = {
    event: "resize",
    data: {
      "cols": terminal2.cols,
      "rows": terminal2.rows,
    },
  };
  socket2.send(JSON.stringify(msg));

  redraw2(socket2, msg)

  terminal2.onData(data => {
    switch (socket2.readyState) {
      case WebSocket.CLOSED:
      case WebSocket.CLOSING:
        terminal2.dispose();
        return;
    }
    const msg = {
      event: "sendKey",
      data: data,
    }
    socket2.send(JSON.stringify(msg));
  })

  socket2.onclose = () => {
    terminal2.writeln('[Disconnected]');
  }

  socket2.onmessage = (e) => {
    terminal2.write(e.data);
  }

  terminal2.onResize((size) => {
    terminal2.resize(size.cols, size.rows);
    const msg = {
      event: "resize",
      data: {
        cols: size.cols,
        rows: size.rows,
      },
    }
    socket2.send(JSON.stringify(msg));
  });

  window.onbeforeunload = () => {
    socket2.close();
  }

  window.addEventListener("resize", () => {
    fitAddon2.fit()
  })
}

