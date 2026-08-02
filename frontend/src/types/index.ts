export type UserRole = 'promoter' | 'banker' | 'legal' | 'compliance' | 'admin';

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: UserRole;
  designation?: string;
  organization?: string;
  is_active: boolean;
}

export interface Project {
  id: number;
  company_name: string;
  cin?: string;
  pan?: string;
  gst?: string;
  incorporation_date?: string;
  registered_address?: string;
  exchange: string;
  issue_type: string;
  target_issue_size_cr: number;
  promoter_name?: string;
  merchant_banker: string;
  status: string;
  current_step: number;
  compliance_score: number;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: number;
  project_id: number;
  filename: string;
  file_path: string;
  document_type: string;
  status: 'Uploaded' | 'Processing' | 'Processed' | 'Verified';
  extracted_data_json?: any;
  confidence_score: number;
  uploaded_at: string;
}

export interface DRHPSection {
  id: number;
  project_id: number;
  section_code: string;
  title: string;
  content_markdown: string;
  metadata_json?: {
    provider?: string;
    confidence_score?: number;
    source_documents?: string[];
  };
  sebi_references_json?: Array<{
    clause: string;
    description: string;
  }>;
  status: 'Draft' | 'In Review' | 'Approved' | 'Needs Revision';
  version: number;
  updated_at: string;
}

export interface ComplianceCheck {
  id: number;
  project_id: number;
  category: string;
  rule_id: string;
  rule_name: string;
  sebi_clause: string;
  status: 'PASS' | 'WARNING' | 'FAIL' | 'PENDING';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  findings: string;
  score: number;
  recommendation?: string;
}

export interface ReviewComment {
  id: number;
  project_id: number;
  section_code: string;
  author_name: string;
  author_role: UserRole;
  comment_text: string;
  status: 'Open' | 'Resolved';
  created_at: string;
}

export interface AuditLog {
  id: number;
  user_email: string;
  user_role: UserRole;
  action: string;
  entity_type: string;
  entity_id?: string;
  details?: string;
  timestamp: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  category: string;
  source: string;
  content: string;
  tags: string[];
  relevance_score?: number;
}
