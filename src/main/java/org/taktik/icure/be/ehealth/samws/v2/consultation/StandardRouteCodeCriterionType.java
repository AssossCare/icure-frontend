//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a>
// Any modifications to this file will be lost upon recompilation of the source schema.
// Generated on: 2019.05.22 at 08:11:32 PM CEST
//


package org.taktik.icure.be.ehealth.samws.v2.consultation;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;
import org.taktik.icure.be.ehealth.samws.v2.refdata.StdRteAllStandardsType;


/**
 * <p>Java class for StandardRouteCodeCriterionType complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="StandardRouteCodeCriterionType">
 *   &lt;simpleContent>
 *     &lt;extension base="&lt;urn:be:fgov:ehealth:samws:v2:core>String20Type">
 *       &lt;attribute name="standard" type="{urn:be:fgov:ehealth:samws:v2:refdata}StdRteAllStandardsType" />
 *     &lt;/extension>
 *   &lt;/simpleContent>
 * &lt;/complexType>
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "StandardRouteCodeCriterionType", propOrder = {
    "value"
})
public class StandardRouteCodeCriterionType
    implements Serializable
{

    private final static long serialVersionUID = 2L;
    @XmlValue
    protected String value;
    @XmlAttribute(name = "standard")
    protected StdRteAllStandardsType standard;

    /**
     * Gets the value of the value property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getValue() {
        return value;
    }

    /**
     * Sets the value of the value property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setValue(String value) {
        this.value = value;
    }

    /**
     * Gets the value of the standard property.
     *
     * @return
     *     possible object is
     *     {@link StdRteAllStandardsType }
     *
     */
    public StdRteAllStandardsType getStandard() {
        return standard;
    }

    /**
     * Sets the value of the standard property.
     *
     * @param value
     *     allowed object is
     *     {@link StdRteAllStandardsType }
     *
     */
    public void setStandard(StdRteAllStandardsType value) {
        this.standard = value;
    }

}
