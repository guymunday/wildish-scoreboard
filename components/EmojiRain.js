import React from "react"

export default function EmojiRain() {
  function emojiInit() {
    var container = document.getElementById("animate")
    var emoji = [
      "🎉",
      "🔥",
      "👏",
      "💃",
      "💅",
      "🤌",
      "🎉",
      "🔥",
      "👏",
      "💃",
      "💅",
      "🤌",
    ]
    var circles = []

    for (var i = 0; i < 15; i++) {
      addCircle(
        i * 150,
        [10 + 0, 300],
        emoji[Math.floor(Math.random() * emoji.length)]
      )
      addCircle(
        i * 150,
        [10 + 0, -300],
        emoji[Math.floor(Math.random() * emoji.length)]
      )
      addCircle(
        i * 150,
        [10 - 200, -300],
        emoji[Math.floor(Math.random() * emoji.length)]
      )
      addCircle(
        i * 150,
        [10 + 200, 300],
        emoji[Math.floor(Math.random() * emoji.length)]
      )
      addCircle(
        i * 150,
        [10 - 400, -300],
        emoji[Math.floor(Math.random() * emoji.length)]
      )
      addCircle(
        i * 150,
        [10 + 400, 300],
        emoji[Math.floor(Math.random() * emoji.length)]
      )
      addCircle(
        i * 150,
        [10 - 600, -300],
        emoji[Math.floor(Math.random() * emoji.length)]
      )
      addCircle(
        i * 150,
        [10 + 600, 300],
        emoji[Math.floor(Math.random() * emoji.length)]
      )
    }

    function addCircle(delay, range, color) {
      setTimeout(function () {
        var c = new Circle(
          range[0] + Math.random() * range[1],
          80 + Math.random() * 4,
          color,
          {
            x: -0.15 + Math.random() * 0.3,
            y: 1 + Math.random() * 1,
          },
          range
        )
        circles.push(c)
      }, delay)
    }

    function Circle(x, y, c, v, range) {
      var _this = this
      this.x = x
      this.y = y
      this.color = c
      this.v = v
      this.range = range
      this.element = document.createElement("span")
      /*this.element.style.display = 'block';*/
      this.element.style.opacity = 0
      this.element.style.position = "absolute"
      this.element.style.fontSize = "50px"
      this.element.style.color =
        "hsl(" + ((Math.random() * 360) | 0) + ",80%,50%)"
      this.element.innerHTML = c
      container.appendChild(this.element)

      this.update = function () {
        if (_this.y > 800) {
          _this.y = 80 + Math.random() * 4
          _this.x = _this.range[0] + Math.random() * _this.range[1]
        }
        _this.y += _this.v.y
        _this.x += _this.v.x
        this.element.style.opacity = 1
        this.element.style.pointerEvents = "none"
        this.element.style.transform =
          "translate3d(" + _this.x * 2 + "px, " + _this.y + "px, 0px)"
      }
    }

    function animate() {
      for (var i in circles) {
        circles[i].update()
      }
      requestAnimationFrame(animate)
    }

    animate()
  }

  React.useEffect(() => {
    emojiInit()
  }, [])

  return (
    <>
      <div
        id="animate"
        style={{
          width: "100%",
          overflow: "visible",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 20,
        }}
      />
    </>
  )
}
