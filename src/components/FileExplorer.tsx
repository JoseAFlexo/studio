
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
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
  Folder as FolderIconLucide, // Renamed to avoid conflict
  Wrench,
  Shield,
  Nut,
  ListChecks,
  Plus,
  ChevronRight,
  ChevronDown,
  FolderSymlink,
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
import { useToast } from "@/hooks/use-toast";
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

interface InduxFile {
  id: string;
  name: string;
  type: string;
  folderId: string; 
  size: string;
  date: string;
  previewUrl?: string;
  dataAiHint?: string;
}

interface InduxFolder {
  id: string;
  name: string;
  icon: React.ElementType;
  children: InduxFolder[];
  isExpanded?: boolean;
}

const initialFileData: InduxFile[] = [
  { id: "1", name: "Maintenance Guide.pdf", type: "pdf", folderId: "maintenance", size: "2.5 MB", date: "2024-01-15" },
  { id: "2", name: "Safety Protocols.docx", type: "docx", folderId: "safety", size: "1.8 MB", date: "2024-02-01" },
  { id: "3", name: "Spare Parts List.xlsx", type: "xlsx", folderId: "spares", size: "3.2 MB", date: "2023-12-20" },
  { id: "4", name: "Technical Specs.txt", type: "txt", folderId: "techdocs", size: "0.5 MB", date: "2024-03-10" },
  { id: "5", name: "Emergency Procedures.pdf", type: "pdf", folderId: "procedures", size: "2.1 MB", date: "2024-02-28" },
  { id: "6", name: "Misc Notes.txt", type: "txt", folderId: "others", size: "0.3 MB", date: "2024-04-05" },
  { id: "7", name: "Machine Blueprint.png", type: "png", folderId: "techdocs", size: "1.2 MB", date: "2024-01-22", previewUrl: "https://placehold.co/600x400.png", dataAiHint: "blueprint machine" },
  { id: "8", name: "Chemical Handling.pdf", type: "pdf", folderId: "safety", size: "2.8 MB", date: "2024-03-15" },
  { id: "9", name: "Electrical Schematics.svg", type: "svg", folderId: "techdocs", size: "0.9 MB", date: "2024-02-10", previewUrl: "https://placehold.co/600x400.png", dataAiHint: "schematics electrical" },
  { id: "10", name: "Calibration Procedure.docx", type: "docx", folderId: "procedures", size: "1.5 MB", date: "2024-01-30" },
  { id: "11", name: "Hydraulic System.pdf", type: "pdf", folderId: "techdocs", size: "3.5 MB", date: "2023-11-25" },
  { id: "12", name: "First Aid Guide.pdf", type: "pdf", folderId: "safety", size: "1.9 MB", date: "2024-04-10" },
  { id: "13", name: "Maintenance Log.txt", type: "txt", folderId: "maintenance", size: "0.4 MB", date: "2024-04-15" },
  { id: "14", name: "Risk Assessment.docx", type: "docx", folderId: "safety", size: "2.0 MB", date: "2024-03-01" },
  { id: "15", name: "Inventory List.xlsx", type: "xlsx", folderId: "spares", size: "3.0 MB", date: "2024-01-10" },
  { id: "16", name: "Troubleshooting Guide.pdf", type: "pdf", folderId: "techdocs", size: "2.7 MB", date: "2023-12-15" },
  { id: "17", name: "Quality Control.pdf", type: "pdf", folderId: "procedures", size: "2.3 MB", date: "2024-03-05" },
  { id: "18", name: "Meeting Minutes.txt", type: "txt", folderId: "others", size: "0.2 MB", date: "2024-04-20" },
  { id: "19", name: "Equipment Manual.pdf", type: "pdf", folderId: "maintenance", size: "3.1 MB", date: "2024-02-01" },
  { id: "20", name: "Hazard Communication.pdf", type: "pdf", folderId: "safety", size: "2.5 MB", date: "2024-03-20" },
  { id: "21", name: "Vendor List.xlsx", type: "xlsx", folderId: "spares", size: "2.8 MB", date: "2024-01-25" },
  { id: "22", name: "System Architecture.svg", type: "svg", folderId: "techdocs", size: "1.1 MB", date: "2024-02-15", previewUrl: "https://placehold.co/600x400.png", dataAiHint: "architecture system" },
  { id: "23", name: "Startup Procedure.docx", type: "docx", folderId: "procedures", size: "1.7 MB", date: "2024-02-05" },
  { id: "24", name: "Project Plan.xlsx", type: "xlsx", folderId: "others", size: "3.3 MB", date: "2024-04-25" },
];

const initialFoldersData: InduxFolder[] = [
  { id: "maintenance", name: "Maintenance", icon: Wrench, children: [], isExpanded: true },
  { id: "safety", name: "Safety & Health", icon: Shield, children: [], isExpanded: true },
  { id: "spares", name: "Spares", icon: Nut, children: [], isExpanded: true },
  { id: "techdocs", name: "Technical Documentation", icon: FileText, children: [], isExpanded: true },
  { id: "procedures", name: "Procedures", icon: ListChecks, children: [], isExpanded: true },
  { id: "others", name: "Others", icon: FolderIconLucide, children: [], isExpanded: true },
];


const fileTypeIcons: { [key: string]: React.ElementType } = {
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
    FolderIconLucide,
    FileIcon,
    ImageIcon,
];


const FileExplorer = () => {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState<InduxFile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [files, setFiles] = useState<InduxFile[]>(initialFileData);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderIcon, setNewFolderIcon] = useState<React.ElementType>(FolderIconLucide);
  const [folders, setFolders] = useState<InduxFolder[]>(initialFoldersData);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileToUpload, setSelectedFileToUpload] = useState<File | null>(null);
  const { toast } = useToast();

  const [isRenameFolderModalOpen, setIsRenameFolderModalOpen] = useState(false);
  const [folderToRename, setFolderToRename] = useState<InduxFolder | null>(null);
  const [renamedFolderName, setRenamedFolderName] = useState("");
  const [isDeleteFolderConfirmOpen, setIsDeleteFolderConfirmOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState<InduxFolder | null>(null);


  const filteredFiles = files.filter((file) => {
    if (selectedFolderId && file.folderId !== selectedFolderId) {
      return false;
    }
    return file.name.toLowerCase().includes(searchTerm.toLowerCase());
  });


  const handleFileClick = (file: InduxFile) => {
    setSelectedFile(file);
    setIsModalOpen(true);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getFileIcon = (type: string) => {
    return fileTypeIcons[type.toLowerCase()] || fileTypeIcons.default;
  };

  const handleZoomIn = () => setZoom((prevZoom) => prevZoom + 0.1);
  const handleZoomOut = () => setZoom((prevZoom) => Math.max(0.1, prevZoom - 0.1));

  const handlePan = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, direction: string) => {
    e.stopPropagation();
    const panAmount = 10 / zoom;
    switch (direction) {
      case "left": setPan((prevPan) => ({ ...prevPan, x: prevPan.x - panAmount })); break;
      case "right": setPan((prevPan) => ({ ...prevPan, x: prevPan.x + panAmount })); break;
      case "up": setPan((prevPan) => ({ ...prevPan, y: prevPan.y - panAmount })); break;
      case "down": setPan((prevPan) => ({ ...prevPan, y: prevPan.y + panAmount })); break;
      default: break;
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

  const handleShare = (file: InduxFile) => {
      if (navigator.share) {
            navigator.share({
                title: file.name,
                text: `Check out this file: ${file.name}`,
                url: file.previewUrl || window.location.href, 
            }).then(() => {
                toast({ title: "Shared", description: `${file.name} shared successfully.` });
            }).catch((error) => {
                console.error('Error sharing', error);
                toast({ title: "Share Error", description: "Could not share file.", variant: "destructive" });
            });
        } else {
            // Fallback for browsers that don't support Web Share API (e.g., copy to clipboard)
            if (file.previewUrl) {
                navigator.clipboard.writeText(file.previewUrl)
                    .then(() => toast({ title: "Link Copied", description: "File link copied to clipboard." }))
                    .catch(() => toast({ title: "Error", description: "Could not copy link.", variant: "destructive" }));
            } else {
                 toast({ title: "Share Not Supported", description: "Web Share API is not supported in your browser, and no direct link available." });
            }
        }
  };

  const handleDownload = (file: InduxFile) => {
      const link = document.createElement('a');
      link.href = file.previewUrl || `data:text/plain;charset=utf-8,Content for ${file.name}`;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({ title: "Download Started", description: `Downloading ${file.name}` });
  };

  const handleRenameFile = (file: InduxFile) => {
      const newName = prompt(`Rename ${file.name} to:`, file.name);
      if (newName && newName.trim() !== "") {
          setFiles(currentFiles => currentFiles.map(f => f.id === file.id ? { ...f, name: newName.trim() } : f));
          toast({ title: "Renamed", description: `${file.name} renamed to ${newName.trim()}` });
      }
  };

  const handleDeleteFile = (file: InduxFile) => {
      if (confirm(`Are you sure you want to delete ${file.name}?`)) {
        setFiles(currentFiles => currentFiles.filter(f => f.id !== file.id));
        toast({ title: "Deleted", description: `${file.name} deleted successfully.` });
      }
  };

  const handleAddFile = () => setIsUploadModalOpen(true);
  const handleCloseUploadModal = () => {
      setIsUploadModalOpen(false);
      setSelectedFileToUpload(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFileToUpload(file);
  };

  const handleUploadFileConfirm = () => {
    if (selectedFileToUpload) {
        const fileType = selectedFileToUpload.name.split('.').pop()?.toLowerCase() || 'default';
        const newFile: InduxFile = {
            id: String(Date.now()),
            name: selectedFileToUpload.name,
            type: fileType,
            folderId: selectedFolderId || folders[0]?.id || "others", 
            size: (selectedFileToUpload.size / 1024 / 1024).toFixed(2) + " MB",
            date: new Date().toLocaleDateString(),
            previewUrl: URL.createObjectURL(selectedFileToUpload), 
            dataAiHint: fileType, 
        };
        setFiles(currentFiles => [...currentFiles, newFile]);
        toast({ title: "File Uploaded", description: `${selectedFileToUpload.name} uploaded successfully.`});
        handleCloseUploadModal();
    } else {
        toast({ title: "Error", description: "No file selected.", variant: "destructive" });
    }
  };

  const handleCreateFolder = () => setIsCreateFolderModalOpen(true);
  const handleCloseCreateFolderModal = () => {
      setIsCreateFolderModalOpen(false);
      setNewFolderName("");
      setNewFolderIcon(FolderIconLucide);
  };
  const handleIconSelect = (icon: React.ElementType) => setNewFolderIcon(icon);

  const findFolderAndParentRecursive = (
    items: InduxFolder[],
    id: string,
    parent: InduxFolder | null = null
  ): { folder: InduxFolder | null; parent: InduxFolder | null } => {
    for (const item of items) {
        if (item.id === id) return { folder: item, parent };
        if (item.children && item.children.length > 0) {
            const found = findFolderAndParentRecursive(item.children, id, item);
            if (found.folder) return found;
        }
    }
    return { folder: null, parent: null };
  };
  
  const addFolderRecursively = (items: InduxFolder[], parentId: string, folderToAdd: InduxFolder): InduxFolder[] => {
    return items.map(item => {
      if (item.id === parentId) {
        // Check for duplicate name in the current level
        const nameExists = item.children.some(child => child.name.toLowerCase() === folderToAdd.name.toLowerCase());
        if (nameExists) {
            toast({ title: "Error", description: `Folder "${folderToAdd.name}" already exists in "${item.name}".`, variant: "destructive" });
            // Indicate failure by not adding, might need a more robust error handling mechanism
            return { ...item }; 
        }
        return { ...item, children: [...item.children, folderToAdd], isExpanded: true };
      }
      if (item.children && item.children.length > 0) {
        return { ...item, children: addFolderRecursively(item.children, parentId, folderToAdd) };
      }
      return item;
    });
  };

  const handleCreateFolderConfirm = () => {
    if (newFolderName.trim() !== "") {
        const newFolderId = String(Date.now());
        const newFolderToAdd: InduxFolder = {
            id: newFolderId,
            name: newFolderName.trim(),
            icon: newFolderIcon,
            children: [],
            isExpanded: true,
        };

        if (selectedFolderId) {
            // Adding as a subfolder
            const { folder: parentFolder } = findFolderAndParentRecursive(folders, selectedFolderId);
            if (parentFolder && parentFolder.children.some(child => child.name.toLowerCase() === newFolderToAdd.name.toLowerCase())) {
                 toast({ title: "Error", description: `Folder "${newFolderToAdd.name}" already exists in "${parentFolder.name}".`, variant: "destructive" });
                 return;
            }
            setFolders(prevFolders => addFolderRecursively(prevFolders, selectedFolderId, newFolderToAdd));
        } else {
            // Adding as a root folder
            if (folders.some(folder => folder.name.toLowerCase() === newFolderToAdd.name.toLowerCase())) {
                 toast({ title: "Error", description: `Folder "${newFolderToAdd.name}" already exists at the root.`, variant: "destructive" });
                 return;
            }
            setFolders(prevFolders => [...prevFolders, newFolderToAdd]);
        }
        toast({ title: "Folder Created", description: `Folder "${newFolderToAdd.name}" created successfully.` });
        handleCloseCreateFolderModal();
    } else {
        toast({ title: "Error", description: "Folder name cannot be empty.", variant: "destructive"});
    }
  };

  const toggleFolderExpansion = (folderId: string) => {
    const updateExpansion = (currentFolders: InduxFolder[]): InduxFolder[] => {
        return currentFolders.map(f => {
            if (f.id === folderId) {
                return { ...f, isExpanded: !f.isExpanded };
            }
            if (f.children && f.children.length > 0) {
                return { ...f, children: updateExpansion(f.children) };
            }
            return f;
        });
    };
    setFolders(prevFolders => updateExpansion(prevFolders));
  };

  // Folder actions
  const handleRenameFolderClick = (folder: InduxFolder) => {
    setFolderToRename(folder);
    setRenamedFolderName(folder.name);
    setIsRenameFolderModalOpen(true);
  };

  const updateFolderNameRecursive = (
    items: InduxFolder[],
    folderId: string,
    newName: string,
    parentId: string | null
  ): InduxFolder[] => {
    return items.map(item => {
        if (item.id === folderId) {
            return { ...item, name: newName };
        }
        if (item.children && item.children.length > 0) {
            return { ...item, children: updateFolderNameRecursive(item.children, folderId, newName, item.id) };
        }
        return item;
    });
  };
  
  const handleRenameFolderConfirm = () => {
    if (!folderToRename || !renamedFolderName.trim()) {
        toast({ title: "Error", description: "Folder name cannot be empty.", variant: "destructive" });
        return;
    }
    const { parent } = findFolderAndParentRecursive(folders, folderToRename.id);
    const siblings = parent ? parent.children : folders;
    if (siblings.some(f => f.id !== folderToRename.id && f.name.toLowerCase() === renamedFolderName.trim().toLowerCase())) {
        toast({ title: "Error", description: `A folder named "${renamedFolderName.trim()}" already exists in this location.`, variant: "destructive" });
        return;
    }

    setFolders(currentFolders => updateFolderNameRecursive(currentFolders, folderToRename.id, renamedFolderName.trim(), parent ? parent.id : null));
    toast({ title: "Folder Renamed", description: `Folder "${folderToRename.name}" renamed to "${renamedFolderName.trim()}".` });
    setIsRenameFolderModalOpen(false);
    setFolderToRename(null);
  };


  const collectAllFolderIdsRecursive = (folder: InduxFolder): string[] => {
    let ids = [folder.id];
    folder.children.forEach(child => {
        ids = ids.concat(collectAllFolderIdsRecursive(child));
    });
    return ids;
  };

  const deleteFolderFromTreeRecursive = (
    currentFolders: InduxFolder[],
    folderIdToDelete: string
  ): InduxFolder[] => {
    return currentFolders
        .filter(folder => folder.id !== folderIdToDelete)
        .map(folder => ({
            ...folder,
            children: folder.children ? deleteFolderFromTreeRecursive(folder.children, folderIdToDelete) : [],
        }));
  };

  const handleDeleteFolderClick = (folder: InduxFolder) => {
    setFolderToDelete(folder);
    setIsDeleteFolderConfirmOpen(true);
  };

  const handleDeleteFolderConfirm = () => {
    if (!folderToDelete) return;

    const idsToDelete = collectAllFolderIdsRecursive(folderToDelete);
    
    setFolders(currentFolders => deleteFolderFromTreeRecursive(currentFolders, folderToDelete.id));
    setFiles(currentFiles => currentFiles.filter(file => !idsToDelete.includes(file.folderId)));

    if (selectedFolderId && idsToDelete.includes(selectedFolderId)) {
        setSelectedFolderId(null);
    }

    toast({ title: "Folder Deleted", description: `Folder "${folderToDelete.name}" and its contents deleted.` });
    setIsDeleteFolderConfirmOpen(false);
    setFolderToDelete(null);
  };

  const handleMoveFolderClick = (folder: InduxFolder) => {
    // Placeholder for move functionality
    toast({ title: "Move Folder", description: `Move functionality for "${folder.name}" is not yet implemented.` });
    console.log("Move folder:", folder);
  };


  const FolderTreeView: React.FC<{
    foldersToRender: InduxFolder[];
    onSelectFolder: (folderId: string) => void;
    currentSelectedFolderId: string | null;
    level: number;
    onToggleExpand: (folderId: string) => void;
    onRenameFolder: (folder: InduxFolder) => void;
    onDeleteFolder: (folder: InduxFolder) => void;
    onMoveFolder: (folder: InduxFolder) => void;
  }> = ({ foldersToRender, onSelectFolder, currentSelectedFolderId, level, onToggleExpand, onRenameFolder, onDeleteFolder, onMoveFolder }) => {
    return (
      <>
        {foldersToRender.map((folder) => (
          <div key={folder.id}>
            <div
              className={`flex items-center space-x-1 py-2 px-3 rounded-md cursor-pointer hover:bg-blue-700 group ${
                currentSelectedFolderId === folder.id ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white"
              }`}
              onClick={() => onSelectFolder(folder.id)}
              style={{ paddingLeft: `${level * 12 + (folder.children.length > 0 ? 0 : 24)}px` }} // Adjusted padding
            >
              {folder.children.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-0 h-6 w-6 mr-1 hover:bg-transparent focus:bg-transparent"
                  onClick={(e) => { e.stopPropagation(); onToggleExpand(folder.id); }}
                >
                  {folder.isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </Button>
              )}
              
              {React.createElement(folder.icon, {
                className: "h-5 w-5 flex-shrink-0", 
              })}
              <span className="ml-1 flex-grow truncate" title={folder.name}>{folder.name}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="p-1 h-6 w-6 opacity-0 group-hover:opacity-100 focus:opacity-100 data-[state=open]:opacity-100 text-gray-400 hover:text-white">
                    <MoreVertical size={16} />
                    <span className="sr-only">Folder options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-gray-800 border-gray-700 text-white" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenuItem onClick={() => onRenameFolder(folder)} className="hover:bg-gray-700">
                    <Edit className="mr-2 h-4 w-4 text-blue-400" /> Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onMoveFolder(folder)} className="hover:bg-gray-700">
                    <FolderSymlink className="mr-2 h-4 w-4 text-blue-400" /> Move
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDeleteFolder(folder)} className="text-red-400 hover:bg-red-700 hover:text-white focus:bg-red-700 focus:text-white">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {folder.isExpanded && folder.children.length > 0 && (
              <FolderTreeView
                foldersToRender={folder.children}
                onSelectFolder={onSelectFolder}
                currentSelectedFolderId={currentSelectedFolderId}
                level={level + 1}
                onToggleExpand={onToggleExpand}
                onRenameFolder={onRenameFolder}
                onDeleteFolder={onDeleteFolder}
                onMoveFolder={onMoveFolder}
              />
            )}
          </div>
        ))}
      </>
    );
  };


  return (
    <>
      <div className="flex h-screen bg-gray-900 text-white">
        {/* Folder Sidebar */}
        <div className="w-72 bg-gray-800 p-4 flex flex-col border-r border-gray-700">
          <div className="mb-4 space-y-2">
            <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
             <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add File
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-gray-800 border-gray-700">
                  <DialogHeader>
                      <DialogTitle className="text-white">Upload File</DialogTitle>
                      <DialogDescription className="text-gray-400">
                          Choose a file to upload. It will be added to the currently selected folder or the first root folder.
                      </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                      <input
                          type="file"
                          id="file-upload"
                          className="hidden"
                          onChange={handleFileUploadChange}
                          ref={fileInputRef}
                      />
                      <Button variant="secondary" className="bg-gray-700 hover:bg-gray-600 text-white" onClick={() => fileInputRef.current?.click()}>
                          Select File
                      </Button>
                      {selectedFileToUpload && (
                          <div className="text-sm text-gray-300 truncate">
                              Selected: {selectedFileToUpload.name}
                          </div>
                      )}
                  </div>
                  <DialogFooter>
                      <DialogClose asChild>
                          <Button type="button" variant="ghost" className="text-gray-300 hover:bg-gray-700" onClick={handleCloseUploadModal}>
                              Cancel
                          </Button>
                      </DialogClose>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleUploadFileConfirm} disabled={!selectedFileToUpload}>
                        Accept
                      </Button>
                  </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={isCreateFolderModalOpen} onOpenChange={setIsCreateFolderModalOpen}>
               <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                    <FolderPlus className="mr-2 h-4 w-4" /> Create Folder
                </Button>
               </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-gray-800 border-gray-700">
                  <DialogHeader>
                      <DialogTitle className="text-white">Create New Folder</DialogTitle>
                      <DialogDescription className="text-gray-400">
                          Choose a name and icon for your new folder.
                      </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 gap-2">
                          {FolderIconOptions.map((IconComponent, index) => (
                              <Button
                                  key={index}
                                  variant="ghost"
                                  className={`w-10 h-10 p-0 hover:bg-gray-700 ${newFolderIcon === IconComponent ? "bg-blue-600 ring-2 ring-blue-400" : "bg-gray-700"}`}
                                  onClick={() => handleIconSelect(IconComponent)}
                                  aria-label={`Select ${IconComponent.displayName || IconComponent.name} Icon`}
                              >
                                  <IconComponent className="w-5 h-5 text-white" />
                              </Button>
                          ))}
                      </div>
                      <div className="grid gap-2">
                          <Label htmlFor="name" className="text-gray-300">Folder Name</Label>
                          <Input
                              id="name"
                              value={newFolderName}
                              onChange={(e) => setNewFolderName(e.target.value)}
                              placeholder="Enter folder name"
                              className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                          />
                      </div>
                  </div>
                  <DialogFooter>
                       <DialogClose asChild>
                          <Button type="button" variant="ghost" className="text-gray-300 hover:bg-gray-700" onClick={handleCloseCreateFolderModal}>
                              Cancel
                          </Button>
                      </DialogClose>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleCreateFolderConfirm}>Create</Button>
                  </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <ScrollArea className="h-full">
            <FolderTreeView
              foldersToRender={folders}
              onSelectFolder={setSelectedFolderId}
              currentSelectedFolderId={selectedFolderId}
              level={0}
              onToggleExpand={toggleFolderExpansion}
              onRenameFolder={handleRenameFolderClick}
              onDeleteFolder={handleDeleteFolderClick}
              onMoveFolder={handleMoveFolderClick}
            />
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="mb-6 flex items-center space-x-2">
            <Search className="text-gray-400" />
            <Input
              type="text"
              placeholder="Search files..."
              className="bg-gray-800 text-white border-gray-700 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <ScrollArea className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFiles.map((file) => {
                const FileIconComponent = getFileIcon(file.type);
                return (
                  <div
                    key={file.id}
                    className={`bg-gray-800 rounded-lg p-4 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-200 ${
                      selectedFile?.id === file.id ? 'ring-2 ring-blue-500' : 'border border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center mb-3 cursor-pointer" onClick={() => handleFileClick(file)}>
                      <FileIconComponent className="mr-3 text-blue-400 h-6 w-6 flex-shrink-0" />
                      <span className="text-gray-100 text-sm font-medium truncate" title={file.name}>{file.name}</span>
                    </div>
                    <div className="text-xs text-gray-400 mb-3">
                        <span>{file.size}</span> | <span>{file.date}</span>
                    </div>
                    <div className="flex items-center justify-end pt-2 border-t border-gray-700">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                            <MoreVertical />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-gray-800 border-gray-700 text-white">
                          <DropdownMenuItem onClick={() => handleFileClick(file)} className="hover:bg-gray-700">
                            <FileIcon className="mr-2 h-4 w-4 text-blue-400" /> Open
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShare(file)} className="hover:bg-gray-700">
                            <Share2 className="mr-2 h-4 w-4 text-blue-400" /> Share
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(file)} className="hover:bg-gray-700">
                            <Download className="mr-2 h-4 w-4 text-blue-400" /> Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRenameFile(file)} className="hover:bg-gray-700">
                            <Edit className="mr-2 h-4 w-4 text-blue-400" /> Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteFile(file)} className="text-red-400 hover:bg-red-700 hover:text-white focus:bg-red-700 focus:text-white">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}
            </div>
            {filteredFiles.length === 0 && searchTerm && (
                <div className="text-center text-gray-500 mt-10">No files found matching "{searchTerm}".</div>
            )}
             {filteredFiles.length === 0 && !searchTerm && selectedFolderId && (
                <div className="text-center text-gray-500 mt-10">This folder is empty.</div>
            )}
          </ScrollArea>
        </div>

        {/* File Preview Modal */}
        {isModalOpen && selectedFile && (
           <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-gray-700" ref={modalRef}>
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                  <h3 className="text-xl text-white truncate pr-4">{selectedFile.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={handleZoomIn} aria-label="Zoom In" className="text-gray-400 hover:text-white">
                      <ZoomIn className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleZoomOut} aria-label="Zoom Out" className="text-gray-400 hover:text-white">
                      <ZoomOut className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={(e) => handlePan(e, "left")} aria-label="Pan Left" className="text-gray-400 hover:text-white">
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={(e) => handlePan(e, "right")} aria-label="Pan Right" className="text-gray-400 hover:text-white">
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={(e) => handlePan(e, "up")} aria-label="Pan Up" className="text-gray-400 hover:text-white">
                      <ArrowUp className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={(e) => handlePan(e, "down")} aria-label="Pan Down" className="text-gray-400 hover:text-white">
                      <ArrowDown className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500" onClick={handleCloseModal}>
                      <X /> <span className="sr-only">Close</span>
                    </Button>
                  </div>
                </div>
                <div className="flex-grow p-4 overflow-auto flex items-center justify-center">
                    <div
                        className="transform transition-transform duration-200"
                        style={{ transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`, transformOrigin: 'center center' }}
                    >
                  {selectedFile.type === "pdf" ? (
                      <iframe src={selectedFile.previewUrl || `https://docs.google.com/gview?url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf&embedded=true`} className="w-[800px] h-[600px] max-w-full max-h-full border-0" title={selectedFile.name}></iframe>
                  ) : selectedFile.type === "png" || selectedFile.type === "jpg" || selectedFile.type === "jpeg" || selectedFile.type === "svg" ? (
                      <img
                        src={selectedFile.previewUrl || "https://placehold.co/800x600.png"}
                        alt={`Preview of ${selectedFile.name}`}
                        className="max-w-full max-h-full object-contain"
                        data-ai-hint={selectedFile.dataAiHint || "image file"}
                      />
                  ) : (
                    <div className="text-center text-gray-400">
                        <FileIcon size={64} className="mx-auto mb-2" />
                        <p>Unsupported file format for preview.</p>
                        <p className="text-sm">{selectedFile.name}</p>
                    </div>
                  )}
                  </div>
                </div>
            </div>
          </div>
        )}
      </div>

      {/* Rename Folder Modal */}
      <Dialog open={isRenameFolderModalOpen} onOpenChange={setIsRenameFolderModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Rename Folder</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter a new name for the folder "{folderToRename?.name}".
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="rename-folder-name" className="text-gray-300">
              New Folder Name
            </Label>
            <Input
              id="rename-folder-name"
              value={renamedFolderName}
              onChange={(e) => setRenamedFolderName(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => { setIsRenameFolderModalOpen(false); setFolderToRename(null); }} className="text-gray-300 hover:bg-gray-700">
              Cancel
            </Button>
            <Button onClick={handleRenameFolderConfirm} className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Folder Confirmation Modal */}
      <Dialog open={isDeleteFolderConfirmOpen} onOpenChange={setIsDeleteFolderConfirmOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Delete Folder</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete the folder "{folderToDelete?.name}" and all its contents? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => { setIsDeleteFolderConfirmOpen(false); setFolderToDelete(null); }} className="text-gray-300 hover:bg-gray-700">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteFolderConfirm} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FileExplorer;
