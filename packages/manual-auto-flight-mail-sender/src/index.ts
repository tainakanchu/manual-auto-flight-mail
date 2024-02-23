import "google-apps-script";

function sendFlightInfo() {
  var htmlBody =
    HtmlService.createHtmlOutputFromFile("mail_template").getContent();

  MailApp.sendEmail({
    to: Session.getActiveUser().getEmail(),
    subject: "フライト情報登録メール",
    htmlBody: htmlBody,
  });
}

function doPost() {}
function doGet() {}
