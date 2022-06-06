var element = document.getElementsByClassName("scanButton");
var element1 = document.getElementsByClassName("writeButton");
var inputValue = document.getElementsByClassName("getIpValue");
setTimeout(function () {
  //element[0].addEventListener("click", scanButton);
  element[0].addEventListener("click", readTag);
}, 1000);

setTimeout(function () {
  element1[0].addEventListener("click", writeButton);
  // element1[0].addEventListener("click", writeTag);
}, 1000);

// async function scanButton() {

//   if ("NDEFReader" in window) {
//     try {
//       const ndef = new NDEFReader();
//       await ndef.scan();

//       $(".scanResult").html("Scan Started");
//       ndef.addEventListener("readingerror", () => {
//         $(".scanResult").html(
//           "Argh! Cannot read data from the NFC tag. Try another one?"
//         );
//       });

//       ndef.addEventListener("reading", ({ message, serialNumber }) => {
//         const decoder = new TextDecoder();
//         $(".scanStrar").html(decoder.decode(message.records.data) +"/"+serialNumber);
//       });
//     } catch (error) {
//       $(".scanResult").html("Argh! " + error);
//     }
//   } else {
//     $(".scanResult").html("No NDEFReader!");
//   }
// }

async function writeButton() {
  var inputValue = document.getElementsByClassName("getIpValue");
   if ("NDEFReader" in window) {
    try {
      const ndef = new NDEFReader();
      await ndef.write(inputValue[0].value);

    } catch (error) {
      $(".scanResult").html("Argh! " + error);
    }
  } else {
    $(".scanResult").html("No NDEFReader!");
  }
}

async function readTag() {
  if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    try {
      await ndef.scan();
      ndef.onreading = event => {
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          $(".recordType").html("Record type:  " + record.recordType);
          $(".mediaType").html("MIME type:    " + record.mediaType);
          $(".data").html("=== data ===\n" + decoder.decode(record.data));
        }
      }
    } catch(error) {
      $(".scanResult").html(error);
    }
  } else {
    $(".scanResult").html("Web NFC is not supported.");
  }
}

// async function writeTag() {
//   if ("NDEFReader" in window) {
//     const ndef = new NDEFReader();
//     try {
//       await ndef.write("What Web Can Do Today");
//       consoleLog("NDEF message written!");
//     } catch(error) {
//       $(".scanResult").html(error);
//     }
//   } else {
//     $(".scanResult").html("Web NFC is not supported.");
//   }
// }
