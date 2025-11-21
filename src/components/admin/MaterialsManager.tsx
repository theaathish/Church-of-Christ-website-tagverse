import { useState, useEffect } from "react";
import { getMaterials, addMaterial, deleteMaterial } from "@/services/materialService";
import { initGoogleDrive, requestAccessToken, uploadToGoogleDrive, deleteFromGoogleDrive, isAuthenticated } from "@/services/googleDriveService";
import { Material } from "@/types/material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Trash2, FileText, ExternalLink } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const MaterialsManager = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Material['category']>('book');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteDriveId, setDeleteDriveId] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    fetchMaterials();
    initGoogleDrive().catch(console.error);
  }, []);

  const fetchMaterials = async () => {
    try {
      const fetchedMaterials = await getMaterials();
      setMaterials(fetchedMaterials);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load materials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await requestAccessToken();
      setAuthenticated(true);
      toast({
        title: "Success",
        description: "Connected to Google Drive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to Google Drive",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        toast({
          title: "Invalid File",
          description: "Please select a PDF file",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile || !title || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and select a PDF file",
        variant: "destructive",
      });
      return;
    }

    if (!isAuthenticated()) {
      toast({
        title: "Not Authenticated",
        description: "Please sign in to Google Drive first",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      // Upload to Google Drive
      const { fileId, webViewLink, thumbnailLink } = await uploadToGoogleDrive(
        selectedFile,
        `${title}.pdf`
      );

      // Save to Firestore
      await addMaterial(title, description, fileId, webViewLink, thumbnailLink, category);

      toast({
        title: "Success",
        description: "Material uploaded successfully",
      });

      // Reset form
      setSelectedFile(null);
      setTitle("");
      setDescription("");
      setCategory('book');
      const fileInput = document.getElementById("file-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      // Refresh list
      await fetchMaterials();
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload material",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      // Delete from Google Drive
      if (deleteDriveId && isAuthenticated()) {
        try {
          await deleteFromGoogleDrive(deleteDriveId);
        } catch (error) {
          console.error('Failed to delete from Drive:', error);
        }
      }

      // Delete from Firestore
      await deleteMaterial(deleteId);

      toast({
        title: "Success",
        description: "Material deleted successfully",
      });

      await fetchMaterials();
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete material",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
      setDeleteDriveId("");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Google Drive Connection */}
      {!authenticated && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-orange-900 mb-1">Connect to Google Drive</h3>
                <p className="text-sm text-orange-700">
                  Sign in to upload materials to Google Drive
                </p>
              </div>
              <Button onClick={handleGoogleSignIn} variant="default">
                Sign in with Google
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Material
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">PDF File</Label>
              <Input
                id="file-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                required
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Understanding the New Covenant"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the material"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(value: any) => setCategory(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="book">Book</SelectItem>
                  <SelectItem value="study">Bible Study</SelectItem>
                  <SelectItem value="sermon">Sermon</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={uploading || !authenticated}>
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Material
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Materials List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Materials ({materials.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {materials.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No materials uploaded yet</p>
          ) : (
            <div className="space-y-4">
              {materials.map((material) => (
                <Card key={material.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold">{material.title}</h3>
                          <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                            {material.category}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{material.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Uploaded: {material.uploadedAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(material.driveUrl, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setDeleteId(material.id);
                            setDeleteDriveId(material.driveFileId);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Material</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this material? This will remove it from both the website and Google Drive. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MaterialsManager;
