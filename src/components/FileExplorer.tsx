"use client";

import React, { useState, useEffect } from "react";
import {
  File,
  Search,
  X,
  Image as ImageIcon,
  File as FileIcon,
  FileText,
  MoreVertical,
  Download,
  Edit,
  Share2,
  FolderPlus,
  Trash2,
  ZoomIn,
  ZoomOut,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Folder as FolderIcon,
  Wrench,
  Shield,
  Nut,
  ListChecks,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

const fileData = [
  { id: "1", name: "Maintenance Guide.pdf", type: "pdf", folder: "Maintenance", size: "2.5 MB", date: "2024-01-15" },
  { id: "2", name: "Safety Protocols.docx", type: "docx", folder: "Safety & Health", size: "1.8 MB", date: "2024-02-01" },
  { id: "3", name: "Spare Parts List.xlsx", type: "xlsx", folder: "Spares", size: "3.2 MB", date: "2023-12-20" },
  { id: "4", name: "Technical Specs.txt", type: "txt", folder: "Technical Documentation", size: "0.5 MB", date: "2024-03-10" },
  { id: "5", name: "Emergency Procedures.pdf", type: "pdf", folder: "Procedures", size: "2.1 MB", date: "2024-02-28" },
  { id: "6", name: "Misc Notes.txt", type: "txt", folder: "Others", size: "0.3 MB", date: "2024-04-05" },
  { id: "7", name: "Machine Blueprint.png", type: "png", folder: "Technical Documentation", size: "1.2 MB", date: "2024-01-22" },
  { id: "8", name: "Chemical Handling.pdf", type: "pdf", folder: "Safety & Health", size: "2.8 MB", date: "2024-03-15" },
  { id: "9", name: "Electrical Schematics.svg", type: "svg", folder: "Technical Documentation", size: "0.9 MB", date: "2024-02-10" },
  { id: "10", name: "Calibration Procedure.docx", type: "docx", folder: "Procedures", size: "1.5 MB", date: "2024-01-30" },
  { id: "11", name: "Hydraulic System.pdf", type: "pdf", folder: "Technical Documentation", size: "3.5 MB", date: "2023-11-25" },
  { id: "12", name: "First Aid Guide.pdf", type: "pdf", folder: "Safety & Health", size: "1.9 MB", date: "2024-04-10" },
  { id: "13", name: "Maintenance Log.txt", type: "txt", folder: "Maintenance", size: "0.4 MB", date: "2024-04-15" },
  { id: "14", name: "Risk Assessment.docx", type: "docx", folder: "Safety & Health", size: "2.0 MB", date: "2024-03-01" },
  { id: "15", name: "Inventory List.xlsx", type: "xlsx", folder: "Spares", size: "3.0 MB", date: "2024-01-10" },
  { id: "16", name: "Troubleshooting Guide.pdf", type: "pdf", folder: "Technical Documentation", size: "2.7 MB", date: "2023-12-15" },
  { id: "17", name: "Quality Control.pdf", type: "pdf", folder: "Procedures", size: "2.3 MB", date: "2024-03-05" },
  { id: "18", name: "Meeting Minutes.txt", type: "txt", folder: "Others", size: "0.2 MB", date: "2024-04-20" },
  { id: "19", name: "Equipment Manual.pdf", type: "pdf", folder: "Maintenance", size: "3.1 MB", date: "2024-02-01" },
  { id: "20", name: "Hazard Communication.pdf", type: "pdf", folder: "Safety & Health", size: "2.5 MB", date: "2024-03-20" },
  { id: "21", name: "Vendor List.xlsx", type: "xlsx", folder: "Spares", size: "2.8 MB", date: "2024-01-25" },
  { id: "22", name: "System Architecture.svg", type: "svg", folder: "Technical Documentation", size: "1.1 MB", date: "2024-02-15" },
  { id: "23", name: "Startup Procedure.docx", type: "docx", folder: "Procedures", size: "1.7 MB", date: "2024-02-05" },
  { id: "24", name: "Project Plan.xlsx", type: "xlsx", folder: "Others", size: "3.3 MB", date: "2024-04-25" },
];

const folderIcons = {
  Maintenance: Wrench,
  "Safety & Health": Shield,
  Spares: Nut,
  "Technical Documentation": FileText,
  Procedures: ListChecks,
  Others: FolderIcon,
};

const fileTypeIcons = {
  pdf: FileText,
  docx: FileText,
  xlsx: FileText,
  txt: FileText,
  png: ImageIcon,
  svg: ImageIcon,
  jpeg: ImageIcon,
  jpg: ImageIcon,
  default: FileIcon,
};

const FileExplorer = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [files, setFiles] = useState(fileData);

  const folders = [
    "Maintenance",
    "Safety & Health",
    "Spares",
    "Technical Documentation",
    "Procedures",
    "Others",
  ];

  const filteredFiles = files.filter((file) => {
    if (selectedFolder && file.folder !== selectedFolder) {
      return false;
    }
    return file.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleFileClick = (file: any) => {
    setSelectedFile(file);
    setIsModalOpen(true);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getFileIcon = (type: string) => {
    return fileTypeIcons[type] || fileTypeIcons.default;
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(0.1, prevZoom - 0.1));
  };

  const handlePan = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, direction: string) => {
    e.stopPropagation();
    switch (direction) {
      case "left":
        setPan((prevPan) => ({ ...prevPan, x: prevPan.x - 10 }));
        break;
      case "right":
        setPan((prevPan) => ({ ...prevPan, x: prevPan.x + 10 }));
        break;
      case "up":
        setPan((prevPan) => ({ ...prevPan, y: prevPan.y - 10 }));
        break;
      case "down":
        setPan((prevPan) => ({ ...prevPan, y: prevPan.y + 10 }));
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex h-full">
      {/* Folder Sidebar */}
      <div
        className="w-64 bg-sidebar-background p-4 flex flex-col"
        style={{ backgroundColor: "#1e293b" }}
      >
        <h2 className="text-xl text-main-text mb-4">Folders</h2>
        {folders.map((folder) => (
          <div
            key={folder}
            className={`flex items-center space-x-2 py-2 px-3 rounded-md cursor-pointer hover:bg-hover-active ${
              selectedFolder === folder ? "bg-accent text-main-text" : "text-secondary-text"
            }`}
            onClick={() => setSelectedFolder(folder)}
            style={{
              backgroundColor: selectedFolder === folder ? "#4ade80" : "",
              color: selectedFolder === folder ? "#f1f5f9" : "#cbd5e1",
            }}
          >
            {React.createElement(folderIcons[folder] || FolderIcon, {
              className: "mr-2 text-secondary-text",
            })}
            <span>{folder}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Search Bar */}
        <div className="mb-4 flex items-center space-x-2">
          <Search className="text-secondary-text" />
          <Input
            type="text"
            placeholder="Search files..."
            className="bg-file-cards text-main-text border-soft-borders rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-accent"
            style={{
              backgroundColor: "#334155",
              color: "#f1f5f9",
              borderColor: "#475569",
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* File Listing */}
        <ScrollArea className="h-[calc(100vh - 150px)] w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFiles.map((file) => {
            const FileIcon = getFileIcon(file.type);
            return (
              <div
                key={file.id}
                className="bg-file-cards rounded-md p-3 flex items-center justify-between hover:bg-hover-active cursor-pointer"
                style={{ backgroundColor: "#334155" }}
              >
                <div className="flex items-center" onClick={() => handleFileClick(file)}>
                  <FileIcon className="mr-2 text-main-text" />
                  <span className="text-main-text">{file.name}</span>
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="outline-none">
                        <MoreVertical className="text-secondary-text hover:text-main-text" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuItem onClick={() => console.log("Share")}>
                        <Share2 className="mr-2 h-4 w-4" /> <span>Share</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log("Move")}>
                        <FolderPlus className="mr-2 h-4 w-4" /> <span>Move to...</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log("Rename")}>
                        <Edit className="mr-2 h-4 w-4" /> <span>Rename</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log("Download")}>
                        <Download className="mr-2 h-4 w-4" /> <span>Download</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log("Delete")} className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </div>
            );
          })}
        </div>
        </ScrollArea>
      </div>

      {/* File Preview Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-file-cards rounded-lg p-4 max-w-3xl max-h-3xl relative" style={{ backgroundColor: "#334155" }}>
            
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl text-main-text mb-2">{selectedFile?.name}</h3>
              <div className="absolute top-2 right-2 cursor-pointer text-secondary-text hover:text-red-500" onClick={handleCloseModal}>
                  <X />
                </div>
              <div className="flex items-center">
                <button onClick={handleZoomIn} className="bg-secondary-text text-main-text px-2 py-1 rounded">
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button onClick={handleZoomOut} className="bg-secondary-text text-main-text px-2 py-1 rounded ml-2">
                  <ZoomOut className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center">
                <button onClick={(e) => handlePan(e, "left")} className="bg-secondary-text text-main-text px-2 py-1 rounded">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button onClick={(e) => handlePan(e, "right")} className="bg-secondary-text text-main-text px-2 py-1 rounded ml-2">
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={(e) => handlePan(e, "up")} className="bg-secondary-text text-main-text px-2 py-1 rounded ml-2">
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button onClick={(e) => handlePan(e, "down")} className="bg-secondary-text text-main-text px-2 py-1 rounded ml-2">
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
            </div>
            {selectedFile?.type === "pdf" ? (
              <div
                style={{
                  width: '100%',
                  height: '500px',
                  overflow: 'auto',
                  transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                  transformOrigin: 'top left',
                }}
              >
                <p className="text-main-text">PDF Preview Placeholder</p>
              </div>
            ) : selectedFile?.type === "png" || selectedFile?.type === "jpg" || selectedFile?.type === "jpeg" || selectedFile?.type === "svg" ? (
              <div
                style={{
                  width: '100%',
                  height: '500px',
                  overflow: 'auto',
                  transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                  transformOrigin: 'top left',
                }}
              >
                <img
                  src={`https://picsum.photos/400/300?random=${selectedFile.id}`}
                  alt="Preview"
                  className="max-h-96"
                  style={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: 'none',
                    maxHeight: 'none',
                  }}
                />
              </div>
            ) : (
              <p className="text-main-text">Unsupported file format</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
