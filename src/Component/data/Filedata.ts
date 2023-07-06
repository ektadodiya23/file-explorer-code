export interface Ifolder {
  id: number ;
  isOpen:boolean , 
  name: string;
  isFolder: boolean;
   size : number , 
  type : string , 
  lastModifiedDate : number 
  items: Ifolder[];
 
}

const explorer: Ifolder[] = [
  {
    id: 1,
    isOpen:true ,
    name: "root",
    isFolder: true,
    size : 456  ,
    type : "folder",
    lastModifiedDate : 1/1/2023,
    items: [
      {
        id: 12,
        isOpen:true,
        name: "public",
        isFolder: true,
        size : 456  ,
        type : "folder",
       lastModifiedDate : 1/1/2023,
        items: [
          {
            id: 13,
            isOpen:true,
            name: "public nested 1",
            isFolder: true,
            size : 456  ,
            type : "folder",
            lastModifiedDate : 1/1/2023,
            items: [
              {
                id: 14,
                isOpen:true,
                name: "index.html",
                isFolder: false,
                size : 456  ,
                type : ".html",
                lastModifiedDate : 2/1/2023,
                items: [],
              },
              {
                id: 15,
                isOpen:true,
                name: "hello.html",
                isFolder: false,
                size : 456  ,
                type : ".html",
                 lastModifiedDate : 5/4/2023,
                items: [],
              },
            ],
          },
          {
            id: 16,
            isOpen:true,
            name: "public_nested_file",
            isFolder: false,
            size : 456  ,
            type : "folder",
            lastModifiedDate : 1/1/2023,
            items: [],
          },
        ],
      },
      {
        id: 2,
        isOpen:true,
        name: "src",
        isFolder: true,
        size : 456  ,
        type : "folder",
        lastModifiedDate : 1/1/2023,
        items: [
          {
            id: 28,
            isOpen:true,
            name: "App.js",
            isFolder: false,
            size : 4568  ,
            type : ".js",
             lastModifiedDate : 4/7/2023,
            items: [],
          },
          {
            id: 29,
            isOpen:true,
            name: "Index.js",
            isFolder: false,
            size : 4565  ,
            type : ".js",
            lastModifiedDate : 7/8/2023,
            items: [],
          },
          {
            id: 20,
            isOpen:true,
            name: "styles.css",
            isFolder: false,
            size : 45610  ,
            type : ".css",
            lastModifiedDate : 12/4/2023,
            items: [],
          },
        ],
      },
      {
        id: 21,
        isOpen:true,
        name: "package.json",
        isFolder: false,
        size : 4565  ,
        type : ".json",
        lastModifiedDate : 20/1/2023,
        items: [],
      },
    ],
  },

  {
    id:3 ,
    isOpen:true,
    name: "root-1" , 
    isFolder :true ,
    size : 456  ,
    type : "folder",
    lastModifiedDate : 1/1/2023,
    items :[]
  },
   {
    id:4 ,
    isOpen:true ,
    name: "root-2" , 
    isFolder :true ,
    size : 456  ,
    type : "folder",
    lastModifiedDate : 1/1/2023,
    items :[
      {
        id: 41,
         isOpen:true , 
        name: "public-1",
        isFolder: true,
        size : 456 ,
        type : "folder",
        lastModifiedDate : 1/1/2023,
        items: []
      },
      {
        id: 42,
        isOpen:true,
        name: "Test.tsx",
        isFolder: false,
        size : 1234  ,
        type : ".tsx",
        lastModifiedDate : 6/1/2023,
        items: []
      }
    ]
  }
];

export default explorer;
