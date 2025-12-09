import { supabase } from "@/integrations/supabase/client";

type AuditActionType = 
  | 'VIEW_ALL_USERS'
  | 'SUSPEND_USER'
  | 'UNSUSPEND_USER'
  | 'TOGGLE_PREMIUM'
  | 'TOGGLE_ADMIN_ROLE'
  | 'VIEW_USER_DETAILS';

interface AuditLogEntry {
  action_type: AuditActionType;
  target_user_id?: string;
  details?: Record<string, unknown>;
}

export async function logAdminAction(entry: AuditLogEntry): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('Cannot log admin action: No authenticated user');
      return;
    }

    // Usar query raw para evitar problemas com tipos não atualizados
    const { error } = await (supabase as any)
      .from('admin_audit_logs')
      .insert({
        admin_user_id: user.id,
        action_type: entry.action_type,
        target_user_id: entry.target_user_id || null,
        details: entry.details || {},
        user_agent: navigator.userAgent,
      });

    if (error) {
      console.error('Failed to log admin action:', error.message);
    }
  } catch (err) {
    console.error('Error logging admin action:', err);
  }
}

export function useAdminAuditLog() {
  return { logAdminAction };
}
