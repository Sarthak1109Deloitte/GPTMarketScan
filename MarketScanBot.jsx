import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function MarketScanBot() {
  const [industry, setIndustry] = useState("");
  const [geography, setGeography] = useState("");
  const [focus, setFocus] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generateScan = async () => {
    setLoading(true);
    const prompt = `You are a strategy consultant preparing a structured 1-page market scan for internal analysis.

Client Inputs:
- Industry: ${industry}
- Geography: ${geography || "Not specified"}
- Focus Area: ${focus || "Not specified"}

Structure the output in the following 4 sections:

1. Market Overview
2. Key Players
3. Trends & Drivers
4. Competitive Landscape

Each bullet must be:
- Direct and specific (max 2 lines)
- Include a superscript reference (e.g., ^1)
- All references listed at the bottom with URLs

Do not use filler or speculative language. Do not include section 5 (Opportunities & Risks).`;

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setOutput(data.result);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Market Scan Bot</h1>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <Input
            placeholder="Industry (e.g., Renewable Energy)"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
          <Input
            placeholder="Geography (optional)"
            value={geography}
            onChange={(e) => setGeography(e.target.value)}
          />
          <Input
            placeholder="Focus Area (optional)"
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
          />
          <Button onClick={generateScan} disabled={loading}>
            {loading ? "Generating..." : "Generate Scan"}
          </Button>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardContent className="whitespace-pre-wrap p-6">
            <h2 className="text-2xl font-semibold mb-4">Market Scan Output</h2>
            <div dangerouslySetInnerHTML={{ __html: output }} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
