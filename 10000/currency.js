$ui.render({
  props: {
    title: "Currency"
  },
  views: [{
      type: "input",
      props: {
        type: $kbType.decimal,
        text: "1",
        font: $font("bold", 20),
        align: $align.center,
        clearButtonMode: 0,
      },
      layout: function(make) {
        make.left.top.equalTo(10)
        make.size.equalTo($size(120, 32))
      },
      events: {
        changed: function(sender) {
          calc(Number(sender.text))
        }
      }
    },
    {
      type: "label",
      props: {
        text: "USD",
        font: $font("bold", 20)
      },
      layout: function(make) {
        let input = $("input")
        make.left.equalTo(input.right).offset(10)
        make.centerY.equalTo(input)
      }
    },
    {
      type: "label",
      props: {
        id: "result",
        text: "CNY",
        font: $font("bold", 20),
        align: $align.right
      },
      layout: function(make) {
        make.right.inset(10)
        make.centerY.equalTo($("input"))
      }
    },
    {
      type: "label",
      props: {
        id: "date",
        textColor: $color("lightGray"),
        align: $align.center
      },
      layout: function(make) {
        make.left.right.equalTo(0)
        make.top.equalTo($("input").bottom).offset(10)
        make.height.equalTo(24)
      }
    }
  ]
})

var rate = 0.0

$ui.loading(true)
$http.get({
  url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22USDCNY%22)&format=json&env=store://datatables.org/alltableswithkeys",
  handler: function(resp) {
    $ui.loading(false)
    rate = Number(resp.data.query.results.rate.Rate)
    calc(1)
    $("date").text = new Date(resp.data.query.created).toLocaleTimeString()
    $("input").focus()
  }
})

function calc(number) {
  $("result").text = (number * rate).toFixed(4) + " CNY"
}