import { MaterialsContent } from "@/types/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface MaterialsTabProps {
  content: MaterialsContent;
  onChange: (content: MaterialsContent) => void;
}

const MaterialsTab = ({ content, onChange }: MaterialsTabProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Page Header</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="materialsPageTitle">Page Title</Label>
            <Input
              id="materialsPageTitle"
              value={content.pageTitle}
              onChange={(e) => onChange({ ...content, pageTitle: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="materialsPageDescription">Page Description</Label>
            <Textarea
              id="materialsPageDescription"
              rows={2}
              value={content.pageDescription}
              onChange={(e) => onChange({ ...content, pageDescription: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scripture Quote</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="materialsScriptureQuote">Scripture Quote</Label>
            <Textarea
              id="materialsScriptureQuote"
              rows={3}
              value={content.scriptureQuote}
              onChange={(e) => onChange({ ...content, scriptureQuote: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="materialsScriptureReference">Scripture Reference</Label>
            <Input
              id="materialsScriptureReference"
              value={content.scriptureReference}
              onChange={(e) => onChange({ ...content, scriptureReference: e.target.value })}
              placeholder="e.g., 2 Timothy 2:15"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialsTab;
