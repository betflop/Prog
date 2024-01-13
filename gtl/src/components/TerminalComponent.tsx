import 'xterm/css/xterm.css';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import React, { useEffect } from 'react';

function TerminalComponent() {


    useEffect(() => {
        
const option = {
  cursorBlink: true,
  // rendererType: "canvas",
  rendererType: "dom",
        letterSpacing: 0,
    fontFamily: "MesloLGS NF",
    fontSize: "20",
};

console.log("document.getElementById('terminal1')", document.getElementById('terminal1'))
const termRef = document.getElementById('terminal1');

console.log("termRef", termRef);
const terminal1 = new Terminal(option);
terminal1.open(termRef);
const fitAddon1 = new FitAddon;
const linkAddon1 = new WebLinksAddon;

console.log("terminal1", terminal1)
terminal1.loadAddon(fitAddon1);
terminal1.loadAddon(linkAddon1);
{/* terminal1.open(document.getElementById('terminal1')); */}
terminal1.focus();
fitAddon1.fit();

const socket1 = new WebSocket('ws://192.168.0.121/16d36022-82ff-40fb-b9e8-9f1891fb3635/');
console.log("socket1", socket1)

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

    }, [])

    return (
    <>
    <div id="terminal1"></div>
    </>
    );
}

export default TerminalComponent;

