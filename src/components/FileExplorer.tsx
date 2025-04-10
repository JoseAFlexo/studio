"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Plus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

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
  { id: "24", name: "Project Plan.xlsx", folder: "Others", size: "3.3 MB", date: "2024-04-25" },
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

const FolderIconOptions = [
    Wrench,
    Shield,
    Nut,
    FileText,
    ListChecks,
    FolderIcon,
    File,
    ImageIcon,
];


const FileExplorer = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [files, setFiles] = useState(fileData);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderIcon, setNewFolderIcon] = useState<any>(FolderIcon);
  const [folders, setFolders] = useState([
    "Maintenance",
    "Safety & Health",
    "Spares",
    "Technical Documentation",
    "Procedures",
    "Others",
  ]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFileToUpload, setSelectedFileToUpload] = useState<File | null>(null);


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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);


  const handleShare = (file: any) => {
      console.log(`Share ${file.name}`);
      toast({
          title: "Share",
          description: `Share ${file.name} functionality not implemented yet.`,
      });
       if (navigator.share) {
            navigator.share({
                title: file.name,
                url: `https://picsum.photos/400/300?random=${file.id}`
            }).then(() => {
                console.log('Successful share');
            }).catch((error) => {
                console.log('Error sharing', error);
            });
        } else {
            toast({
                title: "Share",
                description: "Sharing is not supported on this browser.",
            });
        }
  };

  const handleDownload = (file: any) => {
      const link = document.createElement('a');
      link.href = `https://picsum.photos/400/300?random=${file.id}`;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
          title: "Download",
          description: `Downloading ${file.name}`,
      });
  };

  const handleRename = (file: any) => {
      console.log(`Rename ${file.name}`);
      toast({
          title: "Rename",
          description: `Rename ${file.name} functionality not implemented yet.`,
      });
  };

  const handleDelete = (file: any) => {
      setFiles(currentFiles => currentFiles.filter(f => f.id !== file.id));
      toast({
          title: "Delete",
          description: `${file.name} deleted successfully.`,
      });
  };

    const handleAddFile = () => {
        setIsUploadModalOpen(true);
    };

    const handleCloseUploadModal = () => {
        setIsUploadModalOpen(false);
        setSelectedFileToUpload(null);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFileToUpload(file);
        }
    };

    const handleUploadFileConfirm = () => {
        if (selectedFileToUpload) {
            const fileType = selectedFileToUpload.name.split('.').pop() || 'default';
            const newFile = {
                id: String(Date.now()),
                name: selectedFileToUpload.name,
                type: fileType,
                folder: selectedFolder || "Others",
                size: (selectedFileToUpload.size / 1024 / 1024).toFixed(2) + " MB",
                date: new Date().toLocaleDateString(),
            };
            setFiles(currentFiles => [...currentFiles, newFile]);
            setIsUploadModalOpen(false);
            toast({
                title: "File Uploaded",
                description: `${selectedFileToUpload.name} uploaded successfully.`,
            });
            setSelectedFileToUpload(null);
             handleCloseUploadModal();
        } else {
            toast({
                title: "Error",
                description: "No file selected.",
            });
        }
    };



  const handleCreateFolder = () => {
        setIsCreateFolderModalOpen(true);
    };

    const handleCloseCreateFolderModal = () => {
        setIsCreateFolderModalOpen(false);
        setNewFolderName("");
        setNewFolderIcon(FolderIcon);
    };

    const handleIconSelect = (icon: any) => {
        setNewFolderIcon(icon);
    };

    const handleCreateFolderConfirm = () => {
        if (newFolderName.trim() !== "") {
            const newFolder = newFolderName.trim();
            if (!folders.includes(newFolder)) {
                setFolders([...folders, newFolder]);
                setIsCreateFolderModalOpen(false);
                setNewFolderName("");
                setNewFolderIcon(FolderIcon);
                toast({
                    title: "Folder Created",
                    description: `Folder "${newFolder}" created successfully.`,
                });
            } else {
                toast({
                    title: "Error",
                    description: `Folder "${newFolder}" already exists.`,
                });
            }
        } else {
            toast({
                title: "Error",
                description: "Folder name cannot be empty.",
            });
        }
    };

  return (
    <>
    <div className="flex h-full">
      {/* Folder Sidebar */}
      <div className="w-64 bg-sidebar-background p-4 flex flex-col">
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline" className="mb-4 w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Add File
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Upload File</DialogTitle>
                <DialogDescription>
                    Choose a file to upload to the selected folder.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                />
                <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                    Select File
                </Button>
                {selectedFileToUpload && (
                    <div className="text-sm text-gray-500">
                        Selected File: {selectedFileToUpload.name}
                    </div>
                )}
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="submit" onClick={handleUploadFileConfirm} disabled={!selectedFileToUpload}>Accept</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline" className="mb-4 w-full justify-start">
                <FolderPlus className="mr-2 h-4 w-4" />
                Create Folder
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
                <DialogDescription>
                    Choose a name and icon for your new folder.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 gap-2">
                    {FolderIconOptions.map((Icon, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            className={`
                                w-10 h-10 p-0
                                ${newFolderIcon === Icon ? "bg-accent" : ""}
                            `}
                            onClick={() => handleIconSelect(Icon)}
                            aria-label={`Select ${Icon.name} Icon`}
                        >
                            <Icon className="w-5 h-5" />
                        </Button>
                    ))}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Folder Name</Label>
                    <Input
                        id="name"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        placeholder="Enter folder name"
                    />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="submit" onClick={handleCreateFolderConfirm}>Create</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    <ScrollArea className="h-[calc(100vh - 200px)] w-full">
        {folders.map((folder) => (
          <div
            key={folder}
            className={`flex items-center space-x-2 py-2 px-3 rounded-md cursor-pointer hover:bg-hover-active ${
              selectedFolder === folder ? "bg-primary text-primary-foreground" : "text-secondary-text"
            }`}
            onClick={() => setSelectedFolder(folder)}
          >
            {React.createElement(folderIcons[folder] || FolderIcon, {
              className: "mr-2",
            })}
            <span>{folder}</span>
          </div>
        ))}
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Search Bar */}
        <div className="mb-4 flex items-center space-x-2">
          <Search className="text-secondary-text" />
          <Input
            type="text"
            placeholder="Search files..."
            className="bg-file-cards text-main-text border-soft-borders rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* File Listing */}
        <ScrollArea className="h-[calc(100vh - 150px)] w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFiles.map((file) => {
              const FileIconComponent = getFileIcon(file.type);
              return (
                <div
                  key={file.id}
                  className={`bg-file-cards rounded-md p-3 flex items-center justify-between hover:bg-hover-active cursor-pointer ${
                    selectedFile?.id === file.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="flex items-center" onClick={() => handleFileClick(file)}>
                    <FileIconComponent className="mr-2 text-main-text" />
                    <span className="text-main-text">{file.name}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="text-secondary-text hover:text-main-text" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={() => handleShare(file)}>
                        <Share2 className="mr-2 h-4 w-4" /> <span>Share</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log("Move")}>
                        <FolderPlus className="mr-2 h-4 w-4" /> <span>Move to...</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRename(file)}>
                        <Edit className="mr-2 h-4 w-4" /> <span>Rename</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownload(file)}>
                        <Download className="mr-2 h-4 w-4" /> <span>Download</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(file)} className="text-destructive focus:text-destructive">
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
          <div className="bg-file-cards rounded-lg p-4 max-w-3xl max-h-3xl relative" ref={modalRef}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl text-main-text">{selectedFile?.name}</h3>
                <Button variant="ghost" className="h-8 w-8 p-0 rounded-full" onClick={handleCloseModal}>
                  <X className="text-secondary-text hover:text-red-500" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <div className="flex items-center justify-center mb-4">
                <Button variant="ghost" size="icon" onClick={handleZoomIn} aria-label="Zoom In">
                  <ZoomIn className="h-5 w-5 text-secondary-text" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleZoomOut} aria-label="Zoom Out">
                  <ZoomOut className="h-5 w-5 text-secondary-text" />
                </Button>
                <Button variant="ghost" size="icon" onClick={(e) => handlePan(e, "left")} aria-label="Pan Left">
                  <ArrowLeft className="h-5 w-5 text-secondary-text" />
                </Button>
                <Button variant="ghost" size="icon" onClick={(e) => handlePan(e, "right")} aria-label="Pan Right">
                  <ArrowRight className="h-5 w-5 text-secondary-text" />
                </Button>
                <Button variant="ghost" size="icon" onClick={(e) => handlePan(e, "up")} aria-label="Pan Up">
                  <ArrowUp className="h-5 w-5 text-secondary-text" />
                </Button>
                <Button variant="ghost" size="icon" onClick={(e) => handlePan(e, "down")} aria-label="Pan Down">
                  <ArrowDown className="h-5 w-5 text-secondary-text" />
                </Button>
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
    </>
  );
};

export default FileExplorer;
