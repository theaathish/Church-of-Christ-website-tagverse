import { useEffect, useState } from "react";
import { getMaterials } from "@/services/materialService";
import { getSiteContent } from "@/services/contentService";
import { Material } from "@/types/material";
import { MaterialsContent } from "@/types/content";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, BookOpen, Download, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Materials = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [content, setContent] = useState<MaterialsContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedMaterials, siteContent] = await Promise.all([
          getMaterials(),
          getSiteContent()
        ]);
        setMaterials(fetchedMaterials);
        setContent(siteContent.materials);
      } catch (error) {
        console.error("Error loading materials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = [
    { value: 'all', label: 'All Materials' },
    { value: 'book', label: 'Books' },
    { value: 'study', label: 'Bible Studies' },
    { value: 'sermon', label: 'Sermons' },
    { value: 'other', label: 'Other' },
  ];

  const filteredMaterials = selectedCategory === 'all'
    ? materials
    : materials.filter(m => m.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'book':
        return <BookOpen className="h-5 w-5" />;
      case 'study':
      case 'sermon':
      case 'other':
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'book':
        return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'study':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'sermon':
        return 'bg-purple-500/10 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-gradient-soft">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            {content?.pageTitle || 'Materials'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {content?.pageDescription || 'Books, Bible studies, sermons, and resources for spiritual growth'}
          </p>
        </div>

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Materials Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredMaterials.length === 0 ? (
            <Card className="shadow-soft">
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">
                  No materials available yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((material) => (
                <Card key={material.id} className="shadow-soft hover:shadow-elevated transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getCategoryIcon(material.category)}
                      </div>
                      <div className="flex-1">
                        <Badge className={`mb-2 ${getCategoryColor(material.category)}`}>
                          {material.category}
                        </Badge>
                        <h3 className="font-bold text-lg text-primary mb-2">
                          {material.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {material.description}
                    </p>

                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(material.driveUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const downloadUrl = `https://drive.google.com/uc?export=download&id=${material.driveFileId}`;
                          window.open(downloadUrl, '_blank');
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground mt-4">
                      Added {material.uploadedAt.toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Inspirational Quote */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="bg-card rounded-xl p-8 md:p-12 shadow-soft text-center">
            <blockquote className="text-xl md:text-2xl text-primary font-medium italic mb-4">
              "{content?.scriptureQuote || 'Study to show thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth.'}"
            </blockquote>
            <footer className="text-accent font-medium">— {content?.scriptureReference || '2 Timothy 2:15'}</footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Materials;
