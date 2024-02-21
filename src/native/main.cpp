#include <iostream>
#include <string>
#include <string_view>

#include <webview.h>

#include <index.html.h>

const auto document = std::string(reinterpret_cast<const char *>(embed_index_html::data));

auto main() -> int {
  webview::webview app(false, nullptr);

  app.set_title("Webview App");

  app.set_size(480, 320, WEBVIEW_HINT_NONE);

  app.bind("native_setCount", [&](const std::string& payload) {
    auto count = std::stoi(webview::detail::json_parse(payload, "", 0));

    std::cout << "Count: " << count << std::endl;

    return "";
  });

  app.set_html(document);

  app.run();
}
