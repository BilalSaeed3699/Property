export function groupBy(array, property) {
  var hash = {};
  for (var i = 0; i < array.length; i++) {
    if (!hash[array[i][property]]) hash[array[i][property]] = [];
    hash[array[i][property]].push(array[i]);
  }
  return hash;
}

export const tabs = [
  {
    label: "Single Family",
    index: 0,
    section: [
      "Site Information",
      "Environmental Critical Areas",
      "Geographical Analysis",
      "Utilities/Extras",
    ],
  },
  {
    label: "Cottages",
    index: 1,
    section: ["Site Information", "Utilities/Extras"],
  },
  {
    label: "Townhomes",
    index: 2,
    section: [
      "Site Information",
      "Environmental Critical Areas",
      "Geographical Analysis",
      "Utilities/Extras",
    ],
  },
  {
    label: "Rowhouses",
    index: 3,
    section: [
      "Site Information",
      "Environmental Critical Areas",
      "Geographical Analysis",
      "Utilities/Extras",
    ],
  },
  {
    label: "Apartments",
    index: 4,
    section: [
      "Site Information",
      "Environmental Critical Areas",
      "Geographical Analysis",
      "Utilities/Extras",
    ],
  },
  {
    label: "Condas",
    index: 5,
    section: [
      "Site Information",
      "Environmental Critical Areas",
      "Geographical Analysis",
      "Utilities/Extras",
    ],
  },
];

export function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
