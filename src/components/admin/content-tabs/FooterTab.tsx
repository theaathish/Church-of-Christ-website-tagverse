import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FooterContent } from "@/types/content";

interface FooterTabProps {
  content: FooterContent;
  onChange: (content: FooterContent) => void;
}

const FooterTab = ({ content, onChange }: FooterTabProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Footer Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Church Name</Label>
            <Input
              value={content.churchName}
              onChange={(e) => onChange({ ...content, churchName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              rows={2}
              value={content.description}
              onChange={(e) => onChange({ ...content, description: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scripture Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Section Heading</Label>
            <Input
              value={content.foundationHeading}
              onChange={(e) => onChange({ ...content, foundationHeading: e.target.value })}
              placeholder="Our Foundation"
            />
          </div>
          <div className="space-y-2">
            <Label>Scripture Quote</Label>
            <Textarea
              rows={2}
              value={content.scriptureQuote}
              onChange={(e) => onChange({ ...content, scriptureQuote: e.target.value })}
              placeholder="For this is My blood..."
            />
          </div>
          <div className="space-y-2">
            <Label>Scripture Reference</Label>
            <Input
              value={content.scriptureReference}
              onChange={(e) => onChange({ ...content, scriptureReference: e.target.value })}
              placeholder="Matthew 26:28"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Section Heading</Label>
            <Input
              value={content.connectHeading}
              onChange={(e) => onChange({ ...content, connectHeading: e.target.value })}
              placeholder="Connect With Us"
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={content.email}
              onChange={(e) => onChange({ ...content, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={content.phone}
              onChange={(e) => onChange({ ...content, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Textarea
              rows={3}
              value={content.address}
              onChange={(e) => onChange({ ...content, address: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bottom Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Made With Love Text</Label>
            <Input
              value={content.madeWithLoveText}
              onChange={(e) => onChange({ ...content, madeWithLoveText: e.target.value })}
              placeholder="Made with ❤️ for the glory of God"
            />
          </div>
          <div className="space-y-2">
            <Label>Copyright Text</Label>
            <Input
              value={content.copyright}
              onChange={(e) => onChange({ ...content, copyright: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FooterTab;
