using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_HRMS.Util
{
    public static class Tools
    {
        public static decimal Nvl(this object vValue, decimal vReValue)
        {
            if (vValue == null)
                return vReValue;
            else if (vValue is System.DBNull)
                return vReValue;
            else if (vValue.ToString() == "")
                return vReValue;
            else
                return Convert.ToDecimal(vValue);

        }

        public static double Nvl(this object vValue, double vReValue)
        {
            if (vValue == null)
                return vReValue;
            else if (vValue is System.DBNull)
                return vReValue;
            else if (vValue.ToString() == "")
                return vReValue;
            else
                return Convert.ToDouble(vValue);

        }
        public static DateTime Nvl(this object vValue, DateTime vReValue)
        {
            if (vValue == null)
                return vReValue;
            else if (vValue is System.DBNull)
                return vReValue;
            else if (vValue.ToString() == "")
                return vReValue;
            else
                return Convert.ToDateTime(vValue);

        }
    }
}
