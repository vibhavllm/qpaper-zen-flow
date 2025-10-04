import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Upload, Download, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ResultsPublishing = () => {
  const { toast } = useToast();
  
  const [results, setResults] = useState([
    { id: "R001", exam: "CS301 Midterm", evaluated: 85, total: 85, status: "ready", published: false },
    { id: "R002", exam: "MA201 Final", evaluated: 68, total: 72, status: "pending", published: false },
    { id: "R003", exam: "PH101 Lab Exam", evaluated: 48, total: 48, status: "ready", published: false },
    { id: "R004", exam: "CS402 Quiz", evaluated: 96, total: 96, status: "ready", published: true },
  ]);

  const handlePublish = (id: string) => {
    setResults(results.map(r => 
      r.id === id ? { ...r, published: true } : r
    ));
    toast({
      title: "Results Published",
      description: "Students can now view their results",
    });
  };

  const handleExport = (exam: string) => {
    toast({
      title: "Export Started",
      description: `Exporting results for ${exam}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Results Publishing</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review, approve, and publish exam results to students
          </p>
        </div>
        <Button className="gap-2" variant="outline">
          <Download className="h-4 w-4" />
          Export All Results
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Results", value: "24", icon: Award, color: "bg-emerald-500/10 text-emerald-600" },
          { label: "Ready to Publish", value: "3", icon: CheckCircle, color: "bg-blue-500/10 text-blue-600" },
          { label: "Under Review", value: "1", icon: Clock, color: "bg-orange-500/10 text-orange-600" },
          { label: "Published", value: "20", icon: Upload, color: "bg-purple-500/10 text-purple-600" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`h-10 w-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="h-4 w-4" />
            Results Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.map((result) => {
              const progress = (result.evaluated / result.total) * 100;
              const isComplete = result.evaluated === result.total;
              
              return (
                <div key={result.id} className="p-4 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-xs">{result.id}</Badge>
                        <p className="font-medium text-sm">{result.exam}</p>
                        {result.published ? (
                          <Badge className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                            Published
                          </Badge>
                        ) : isComplete ? (
                          <Badge className="text-xs bg-blue-500/10 text-blue-600 border-blue-500/20">
                            Ready
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            Pending
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Evaluation Progress</span>
                          <span>{result.evaluated} of {result.total} evaluated</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleExport(result.exam)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                    {isComplete && !result.published && (
                      <Button 
                        size="sm"
                        onClick={() => handlePublish(result.id)}
                      >
                        <Upload className="h-3 w-3 mr-1" />
                        Publish Results
                      </Button>
                    )}
                    {!isComplete && (
                      <Button size="sm" variant="ghost" className="text-muted-foreground">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Waiting for evaluation
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
