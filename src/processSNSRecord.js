// Per the `fanout-s3-event-notifications-to-multiple-endpoints` article
module.exports = function(record) {
  var stringifiedRecord = JSON.stringify(record.Sns.Message);
  var sanitizedRecord = stringifiedRecord.replace(/\\/g, '');

  return JSON.parse(sanitizedRecord.substring(1, sanitizedRecord.length - 1));
};
