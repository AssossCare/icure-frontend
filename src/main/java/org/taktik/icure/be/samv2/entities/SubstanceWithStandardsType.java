//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a>
// Any modifications to this file will be lost upon recompilation of the source schema.
// Generated on: 2019.05.22 at 08:11:32 PM CEST
//


package org.taktik.icure.be.samv2.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import org.taktik.icure.be.ehealth.samws.v2.refdata.SubstanceType;


/**
 * <p>Java class for SubstanceWithStandardsType complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="SubstanceWithStandardsType">
 *   &lt;complexContent>
 *     &lt;extension base="{urn:be:fgov:ehealth:samws:v2:refdata}SubstanceType">
 *       &lt;sequence>
 *         &lt;element name="StandardSubstance" type="{urn:be:fgov:ehealth:samws:v2:export}ExportStandardSubstanceType" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "SubstanceWithStandardsType", propOrder = {
    "standardSubstances"
})
public class SubstanceWithStandardsType
    extends SubstanceType
    implements Serializable
{

    private final static long serialVersionUID = 2L;
    @XmlElement(name = "StandardSubstance")
    protected List<ExportStandardSubstanceType> standardSubstances;

    /**
     * Gets the value of the standardSubstances property.
     *
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the standardSubstances property.
     *
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getStandardSubstances().add(newItem);
     * </pre>
     *
     *
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ExportStandardSubstanceType }
     *
     *
     */
    public List<ExportStandardSubstanceType> getStandardSubstances() {
        if (standardSubstances == null) {
            standardSubstances = new ArrayList<ExportStandardSubstanceType>();
        }
        return this.standardSubstances;
    }

}
