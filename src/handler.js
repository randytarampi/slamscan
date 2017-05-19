var async = require('async');
var util = require('util');
var downloadClamscanDbFiles = require('./downloadClamscanDbFiles');
var processS3Record = require('./processS3Record');
var processSNSRecord = require('./processSNSRecord');

module.exports = function(event, context, callback) {
  console.log('Reading options from event: %j',
    util.inspect(event, {depth: 5})
  );

  if (typeof (event.Records) === 'undefined') {
    return callback(new Error(
      util.format('Unable to find event records %j', event)
    ));
  }

  var s3Records;

  if (event.Records[0].s3) {
    s3Records = event.Records;
  } else if (event.Records[0].Sns) {
    s3Records = [];
    event.Records.forEach(function(record) {
      s3Records = s3Records.concat(
        processSNSRecord(record).Records
      );
    });
  } else {
    return callback(new Error(
      util.format('Unable to parse event %j', event)
    ));
  }

  async.parallel({
    downloadClamscanDbFiles: downloadClamscanDbFiles
  }, function(err) {
    if (err) {
      console.log('Failed to download clamscandb files. Exiting');
      return callback(err);
    }

    async.each(
      s3Records,
      processS3Record,
      callback
    );
  });
};
